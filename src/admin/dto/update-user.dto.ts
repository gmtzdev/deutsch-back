import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/auth/enum/user-rol.enum';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'nuevo@ejemplo.com' })
    @IsEmail({}, { message: 'Email inválido' })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: 'Juan Pérez' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @ApiPropertyOptional({ example: 'nuevaContraseña123', minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
}
