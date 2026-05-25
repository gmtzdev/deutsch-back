import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateLessonDto } from './dto/generate-lesson.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post('generate-lesson')
  @ApiBody({
    type: GenerateLessonDto
  })
  generateLesson(@Body() body: GenerateLessonDto): Promise<any> {
    return this.aiService.generateLesson(
      body.prompt,
      body.currentElements ?? [],
      body.chatHistory ?? [],
    );
  }
}
