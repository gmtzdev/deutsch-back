import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginResponse } from './dto/LoginResponse.dto';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar nuevo usuario' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.', type: LoginResponse })
    @ApiResponse({ status: 409, description: 'El email ya está registrado.' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.', type: LoginResponse })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Datos del usuario autenticado.', type: User })
    @ApiResponse({ status: 401, description: 'Token inválido o no proporcionado.' })
    getProfile(@Request() req: any) {
        const { password, ...profile } = req.user;
        return profile;
    }
}
