import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Level } from '../../levels/entities/level.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('groups')
export class Group {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Grupo de nivel A1' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Descripción del grupo de nivel A1' })
    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.groups, { cascade: true })
    @JoinTable()
    users: User[];

    @ManyToMany(() => Level, (level) => level.groups, { cascade: true })
    @JoinTable()
    levels: Level[];
}
