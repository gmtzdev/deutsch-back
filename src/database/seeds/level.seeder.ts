import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Level } from '../../levels/entities/level.entity';

export class LevelSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const repo = dataSource.getRepository(Level);
        await repo.insert([
            { title: 'Principiante absoluto', description: 'Primeras palabras y saludos. Objetos cotidianos y frases básicas.', icon: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-9"/><path d="M9.5 9.4c1.1.8 1.8 2.1 2.5 3.6 1 2 2 4.6 5 6.4"/><path d="M5 11a5 5 0 0 1 9.5 0"/>', tag: 'A1.1', lessonNumber: 0, color: '#22c55e' },
            { title: 'Principiante', description: 'Números, colores, familia y rutinas diarias en presente simple.', icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>', tag: 'A1.2', lessonNumber: 0, color: '#16a34a' },
            { title: 'Básico', description: 'Verbos irregulares, artículos y el pasado simple (Perfekt).', icon: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>', tag: 'A2.1', lessonNumber: 0, color: '#3b82f6' },
            { title: 'Elemental', description: 'Casos nominativo/acusativo, compras y vida en la ciudad.', icon: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>', tag: 'A2.2', lessonNumber: 0, color: '#2563eb' },
            { title: 'Intermedio', description: 'Caso dativo, oraciones subordinadas y narración de eventos pasados.', icon: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>', tag: 'B1.1', lessonNumber: 0, color: '#8b5cf6' },
            { title: 'Intermedio avanzado', description: 'Konjunktiv II, declinaciones del adjetivo y expresión de opiniones.', icon: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>', tag: 'B1.2', lessonNumber: 0, color: '#7c3aed' },
            { title: 'Avanzado', description: 'Voz pasiva, preposiciones complejas y textos argumentativos.', icon: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>', tag: 'B2.1', lessonNumber: 0, color: '#f59e0b' },
            { title: 'Avanzado superior', description: 'Estilo indirecto, registro formal y preparación al examen oficial.', icon: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', tag: 'B2.2', lessonNumber: 0, color: '#d97706' },
        ]);
    }
}