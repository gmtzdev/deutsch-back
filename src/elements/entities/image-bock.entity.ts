import { Entity } from 'typeorm';
import { Element } from './element.entity';

/**
 * Represents an image block in a lesson.
 * - `text`  → stored filename (e.g. "1712345678-photo.jpg")
 * - `style` → alt text / caption
 */
@Entity()
export class ImageBlock extends Element {
}
