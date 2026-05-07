import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../auth/entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'usuario@ejemplo.com' })
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @ApiProperty({ example: 'miContraseña123', minLength: 6 })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiPropertyOptional({ example: 'Juan Pérez' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ enum: UserRole, default: UserRole.USER })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
