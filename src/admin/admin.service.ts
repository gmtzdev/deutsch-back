import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const exists = await this.userRepository.findOne({ where: { email: dto.email } });
        if (exists) throw new ConflictException('El email ya está registrado');

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({ ...dto, password: hashedPassword });
        const saved = await this.userRepository.save(user);

        const { password, ...result } = saved;
        return result as User;
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find({ select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'] });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        });
        if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        return user;
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);

        if (dto.email && dto.email !== user.email) {
            const exists = await this.userRepository.findOne({ where: { email: dto.email } });
            if (exists) throw new ConflictException('El email ya está en uso');
        }

        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }

        Object.assign(user, dto);
        await this.userRepository.save(user);

        const { password, ...result } = user;
        return result as User;
    }

    async remove(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        await this.userRepository.remove(user);
    }
}
