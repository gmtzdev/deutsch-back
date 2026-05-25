import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureOpenAI } from 'openai';
import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources';


// ======================== TYPES ========================

interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: any;
  tool_call_id?: string;
  tool_calls?: any[];
}

interface LessonElement {
  type: string;
  order: number;
  text?: string;
  style?: string;
  baseStyle?: string;
  gridId?: string | null;
  gridCols?: number;
  list?: { baseStyle: string; content: string }[];
  headers?: string[];
  rows?: any[];
  verbs?: { name: string; rows: { pronoun: string; verb: string; ending?: string }[] }[];
  questions?: { question: string; answer: string; hint?: string }[];
  words?: string[];
  items?: { text: string; label?: string }[];
}

interface GenAILessonResponse {
  elements: LessonElement[];
  message: string;
  chatHistory: ChatCompletionMessageParam[];
}

// ======================== SYSTEM PROMPT ========================

const SYSTEM_PROMPT = `Eres un asistente experto en crear lecciones de alemán para una aplicación de aprendizaje de idiomas.
Tu trabajo es generar un array de elementos que componen una lección de alemán, siguiendo instrucciones del usuario.

Cuando el usuario pida crear o modificar una lección, DEBES responder usando las funciones (tools) disponibles.

Los tipos de elemento disponibles son:
- element: Párrafo de texto simple. Usa 'text' para el contenido.
- title: Título principal. Usa 'text' y 'baseStyle' (h1, h2, h3).
- subtitle: Subtítulo. Usa 'text' y 'baseStyle' (h4, h5).
- tip: Cuadro de consejo/nota. Usa 'text'.
- unorderedList: Lista con viñetas. Usa 'list': array de {baseStyle: 'li', content: string}.
- table: Tabla. Usa 'headers': string[] y 'rows': [{cells: string[]}].
- conjugation: Tabla de conjugación verbal. Usa 'verbs': [{name: string, rows: [{pronoun, verb, ending?}]}]. Pronombres: ich, du, er/sie/es, wir, ihr, sie/Sie.
- quiz: Preguntas de práctica. Usa 'questions': [{question, answer, hint?}].
- dragDrop: Ejercicio de completar frases. Usa 'words': string[] (pool de palabras) y 'rows': [{before?, after?, answer}].
- pronunciationBlock: Bloque de pronunciación. Usa 'items': [{text, label?}].

Para todos los elementos:
- 'order': posición en la lección (1, 2, 3...) — obligatorio
- 'type': tipo del elemento — obligatorio
- 'style': clases CSS opcionales
- 'gridId' + 'gridCols': para agrupar elementos en columnas (opcional)

Crea lecciones bien estructuradas: empieza con un title, usa elements para explicar, tables/conjugation para gramática, quiz/dragDrop para practicar.
Responde siempre en español cuando expliques algo. El contenido de la lección debe estar en alemán con traducciones donde corresponda.`;

// ======================== TOOL DEFINITIONS ========================

const ELEMENT_ITEM_SCHEMA = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['element', 'title', 'subtitle', 'tip', 'unorderedList', 'table', 'conjugation', 'quiz', 'dragDrop', 'pronunciationBlock'] },
    order: { type: 'number' },
    text: { type: 'string' },
    style: { type: 'string' },
    baseStyle: { type: 'string', description: 'Para title: h1/h2/h3. Para subtitle: h4/h5. Para unorderedList: ul/ol.' },
    gridId: { type: 'string' },
    gridCols: { type: 'number' },
    list: { type: 'array', items: { type: 'object', properties: { baseStyle: { type: 'string' }, content: { type: 'string' } }, required: ['content'] } },
    headers: { type: 'array', items: { type: 'string' } },
    rows: { type: 'array', items: { type: 'object' }, description: 'Para table: [{cells: string[]}]. Para dragDrop: [{before?, after?, answer}].' },
    verbs: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, rows: { type: 'array', items: { type: 'object', properties: { pronoun: { type: 'string' }, verb: { type: 'string' }, ending: { type: 'string' } }, required: ['pronoun', 'verb'] } } }, required: ['name', 'rows'] } },
    questions: { type: 'array', items: { type: 'object', properties: { question: { type: 'string' }, answer: { type: 'string' }, hint: { type: 'string' } }, required: ['question', 'answer'] } },
    words: { type: 'array', items: { type: 'string' } },
    items: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, label: { type: 'string' } }, required: ['text'] } }
  },
  required: ['type', 'order']
};

const TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'set_lesson',
      description: 'Establece o reemplaza completamente la lección con un nuevo array de elementos. Usar cuando se crea una lección nueva desde cero.',
      parameters: {
        type: 'object',
        properties: {
          elements: { type: 'array', items: ELEMENT_ITEM_SCHEMA }
        },
        required: ['elements']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'add_elements',
      description: 'Agrega uno o más elementos al final de la lección existente o en la posición indicada por order.',
      parameters: {
        type: 'object',
        properties: {
          elements: { type: 'array', items: { ...ELEMENT_ITEM_SCHEMA, required: ['type'] } }
        },
        required: ['elements']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'remove_elements',
      description: 'Elimina elementos de la lección por su número de order.',
      parameters: {
        type: 'object',
        properties: {
          orders: { type: 'array', items: { type: 'number' }, description: 'Números de order de los elementos a eliminar' }
        },
        required: ['orders']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_element',
      description: 'Actualiza las propiedades de un elemento existente identificado por su order.',
      parameters: {
        type: 'object',
        properties: {
          order: { type: 'number', description: 'Order del elemento a modificar' },
          text: { type: 'string' },
          style: { type: 'string' },
          baseStyle: { type: 'string' },
          list: { type: 'array', items: { type: 'object' } },
          headers: { type: 'array', items: { type: 'string' } },
          rows: { type: 'array', items: { type: 'object' } },
          verbs: { type: 'array', items: { type: 'object' } },
          questions: { type: 'array', items: { type: 'object' } },
          words: { type: 'array', items: { type: 'string' } },
          items: { type: 'array', items: { type: 'object' } }
        },
        required: ['order']
      }
    }
  }
];

// ======================== TOOL EXECUTION ========================

function normalizeElement(el: any, defaultOrder: number): LessonElement {
  return {
    type: el.type,
    order: el.order ?? defaultOrder,
    ...(el.text !== undefined && { text: el.text }),
    ...(el.style !== undefined && { style: el.style }),
    ...(el.baseStyle !== undefined && { baseStyle: el.baseStyle }),
    ...(el.gridId !== undefined && { gridId: el.gridId }),
    ...(el.gridCols !== undefined && { gridCols: el.gridCols }),
    ...(el.list !== undefined && { list: el.list }),
    ...(el.headers !== undefined && { headers: el.headers }),
    ...(el.rows !== undefined && { rows: el.rows }),
    ...(el.verbs !== undefined && { verbs: el.verbs }),
    ...(el.questions !== undefined && { questions: el.questions }),
    ...(el.words !== undefined && { words: el.words }),
    ...(el.items !== undefined && { items: el.items }),
  };
}

function executeToolCall(toolName: string, args: any, current: LessonElement[]): LessonElement[] {
  switch (toolName) {
    case 'set_lesson': {
      return (args.elements || []).map((el: any, i: number) => normalizeElement(el, i + 1));
    }

    case 'add_elements': {
      const maxOrder = current.length > 0 ? Math.max(...current.map(e => e.order)) : 0;
      const newEls = (args.elements || []).map((el: any, i: number) =>
        normalizeElement(el, el.order ?? maxOrder + i + 1)
      );
      return [...current, ...newEls].sort((a, b) => a.order - b.order);
    }

    case 'remove_elements': {
      const toRemove: number[] = args.orders || [];
      const filtered = current.filter(e => !toRemove.includes(e.order));
      return filtered.map((e, i) => ({ ...e, order: i + 1 }));
    }

    case 'update_element': {
      return current.map(e => {
        if (e.order !== args.order) return e;
        const { order: _, ...patch } = args;
        return { ...e, ...patch };
      });
    }

    default:
      return current;
  }
}

// ======================== SERVICE ========================

@Injectable()
export class AiService {
  constructor(private readonly configService: ConfigService) { }

  async generateLesson(
    prompt: string,
    currentElements: LessonElement[],
    chatHistory: ChatCompletionMessageParam[]
  ): Promise<GenAILessonResponse> {
    let elements = [...currentElements];

    const messages: ChatCompletionMessageParam[] = [{ role: 'system', content: SYSTEM_PROMPT } as ChatCompletionMessageParam];

    for (const msg of chatHistory) {
      if (msg.role !== 'system') messages.push(msg);
    }

    const userContent = elements.length > 0
      ? `[Estado actual de la lección]\n${JSON.stringify(elements, null, 2)}\n\n[Instrucción]\n${prompt}`
      : prompt;

    messages.push({ role: 'user', content: userContent });

    const response = await this.callOpenAI(messages);
    const choice = response.choices[0];

    if (choice.message.tool_calls?.length > 0) {
      messages.push(choice.message);

      for (const toolCall of choice.message.tool_calls) {
        const fnName: string = toolCall.function.name;
        const fnArgs = JSON.parse(toolCall.function.arguments);
        elements = executeToolCall(fnName, fnArgs, elements);

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify({ success: true, result: `${fnName} ejecutado correctamente` })
        });
      }

      const followUp = await this.callOpenAI(messages);
      const followUpMessage: string = followUp.choices[0].message.content || 'Lección generada.';

      return {
        elements,
        message: followUpMessage,
        chatHistory: [
          ...chatHistory,
          { role: 'user', content: prompt },
          { role: 'assistant', content: followUpMessage }
        ]
      };
    }

    const assistantMessage: string = choice.message.content || '';
    return {
      elements,
      message: assistantMessage,
      chatHistory: [
        ...chatHistory,
        { role: 'user', content: prompt },
        { role: 'assistant', content: assistantMessage }
      ]
    };
  }

  private async callOpenAI(messages: ChatCompletionMessageParam[]): Promise<any> {
    const endpoint = this.configService.getOrThrow<string>('OPENAI_ENDPOINT');
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    const modelName = this.configService.get<string>('OPENAI_MODEL');
    const deployment = this.configService.get<string>('OPENAI_DEPLOYMENT');
    const apiVersion = this.configService.get<string>('OPENAI_API_VERSION');

    const options = { endpoint, apiKey, deployment, apiVersion }

    // const res = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`
    //   },
    //   body: JSON.stringify({
    //     model,
    //     messages,
    //     tools: TOOLS,
    //     tool_choice: 'auto',
    //     temperature: 0.4,
    //     max_tokens: 4096
    //   }),
    //   signal: AbortSignal.timeout(60000)
    // });

    // if (!res.ok) {
    //   const body = await res.text();
    //   throw new Error(`OpenAI API error ${res.status}: ${body}`);
    // }

    // return res.json();


    const client = new AzureOpenAI(options);

    const response = await client.chat.completions.create({
      messages: messages,
      max_tokens: 4096,
      temperature: 0.4,
      top_p: 1,
      model: modelName,
      tool_choice: 'auto',
      tools: TOOLS,
    });
    return response;

    // if (response. !== undefined && response.status !== "200") {
    //   throw response.error;
    // }


    // console.log(response.choices[0].message.content);
  }
}
