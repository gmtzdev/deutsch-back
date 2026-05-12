import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Correo electrónico del usuario' })
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @ApiProperty({ example: 'miContraseña123', description: 'Contraseña del usuario (mínimo 6 caracteres)', minLength: 6 })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiPropertyOptional({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
    @IsString()
    @IsOptional()
    name?: string;
}
