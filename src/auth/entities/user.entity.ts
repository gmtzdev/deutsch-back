import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/user-rol.enum';
import { Group } from '../../groups/entities/group.entity';



@Entity('users')
export class User {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'usuario@ejemplo.com' })
    @Column({ unique: true })
    email: string;

    @ApiHideProperty()
    @Column({ select: false })
    password: string;

    @ApiProperty({ example: 'Juan Pérez', nullable: true })
    @Column({ nullable: true })
    name: string;

    @ApiProperty({ enum: UserRole, example: UserRole.USER })
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    verified: boolean;

    @ManyToMany(() => Group, (group) => group.users)
    groups: Group[];
}
