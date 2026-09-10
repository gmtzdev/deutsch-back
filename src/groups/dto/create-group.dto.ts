import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGroupDto {
    @ApiProperty({ example: 'Grupo A1' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del grupo es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    name: string;

    @ApiProperty({ example: 'Descripción del grupo A1' })
    @IsString({ message: 'La descripción debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción del grupo es obligatoria' })
    @MinLength(2, { message: 'La descripción debe tener al menos 2 caracteres' })
    description: string;

    @ApiProperty({ example: [1, 2, 3], required: false })
    @IsOptional()
    @IsArray({ message: 'Los usuarios deben enviarse como un arreglo de IDs' })
    userIds?: number[];

    @ApiProperty({ example: [1, 2], required: false })
    @IsOptional()
    @IsArray({ message: 'Los niveles deben enviarse como un arreglo de IDs' })
    levelIds?: number[];
}
