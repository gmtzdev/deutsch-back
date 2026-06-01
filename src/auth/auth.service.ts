import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponse } from './dto/LoginResponse.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('El email ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword,
            verified: false,
        });

        const savedUser = await this.userRepository.save(user);
        if (!savedUser) {
            throw new ConflictException('Error al registrar el usuario');
        }
        return true;
    }

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const user = await this.userRepository.findOne({
            select: ['id', 'name', 'role', 'password', 'verified'],
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        if (!user.verified) {
            throw new UnauthorizedException('El usuario no ha sido verificado', 'USER_NOT_VERIFIED');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const token = this.generateToken(user);
        return {
            success: true,
            token: token.access_token,
            user: {
                id: user.id,
                username: user.name,
                role: user.role,
            },
        };
    }

    async validateUser(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    private generateToken(user: User): { access_token: string } {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
