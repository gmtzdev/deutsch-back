import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { LevelSeeder } from './seeds/level.seeder';
import { Level } from '../levels/entities/level.entity';
import { Topic } from '../topics/entities/topic.entity';
import { Subtopic } from '../subtopics/entities/subtopic.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Element } from '../elements/entities/element.entity';
import { Title } from '../elements/entities/title.entity';
import { Subtitle } from '../elements/entities/subtitle.entity';

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'lalo',
    password: 'laura',
    database: 'deutschapp',
    entities: [Level, Topic, Subtopic, Lesson, Element, Title, Subtitle],
});

dataSource.initialize().then(() => runSeeders(dataSource, {
    seeds: [LevelSeeder],
}));