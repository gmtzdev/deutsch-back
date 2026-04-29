import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponseUser {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Juan Pérez' })
    username: string;

    @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
    role: string;
}

export class LoginResponse {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiPropertyOptional({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    token?: string;

    @ApiPropertyOptional({ type: () => LoginResponseUser })
    user?: LoginResponseUser;

    @ApiPropertyOptional({ example: 'Credenciales inválidas' })
    error?: string;
}
