import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Level } from '../../levels/entities/level.entity';

export class LevelSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const repo = dataSource.getRepository(Level);
        await repo.insert([
            { title: 'Principiante absoluto', description: 'Primeras palabras y saludos. Objetos cotidianos y frases básicas.', icon: 'a1.png', tag: 'A1.1', lessonNumber: 0, color: '#22c55e' },
            { title: 'Principiante', description: 'Números, colores, familia y rutinas diarias en presente simple.', icon: 'a1.png', tag: 'A1.2', lessonNumber: 0, color: '#16a34a' },
            { title: 'Básico', description: 'Verbos irregulares, artículos y el pasado simple (Perfekt).', icon: 'a1.png', tag: 'A2.1', lessonNumber: 0, color: '#3b82f6' },
            { title: 'Elemental', description: 'Casos nominativo/acusativo, compras y vida en la ciudad.', icon: 'a1.png', tag: 'A2.2', lessonNumber: 0, color: '#2563eb' },
            { title: 'Intermedio', description: 'Caso dativo, oraciones subordinadas y narración de eventos pasados.', icon: 'a1.png', tag: 'B1.1', lessonNumber: 0, color: '#8b5cf6' },
            { title: 'Intermedio avanzado', description: 'Konjunktiv II, declinaciones del adjetivo y expresión de opiniones.', icon: 'a1.png', tag: 'B1.2', lessonNumber: 0, color: '#7c3aed' },
            { title: 'Avanzado', description: 'Voz pasiva, preposiciones complejas y textos argumentativos.', icon: 'a1.png', tag: 'B2.1', lessonNumber: 0, color: '#f59e0b' },
            { title: 'Avanzado superior', description: 'Estilo indirecto, registro formal y preparación al examen oficial.', icon: 'a1.png', tag: 'B2.2', lessonNumber: 0, color: '#d97706' },
        ]);
    }
}