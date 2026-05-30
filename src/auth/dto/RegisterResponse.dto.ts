import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterResponse {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiPropertyOptional({ example: 'Error al registrar el usuario' })
    error?: string;
}