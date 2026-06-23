import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { User } from '../auth/entities/user.entity';
import { UserRole } from 'src/auth/enum/user-rol.enum';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.', type: User })
    @ApiResponse({ status: 409, description: 'El email ya está registrado.' })
    create(@Body() dto: CreateUserDto) {
        return this.adminService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios.', type: [User] })
    @ApiResponse({ status: 401, description: 'No autenticado.' })
    @ApiResponse({ status: 403, description: 'Sin permisos de administrador.' })
    findAll() {
        return this.adminService.findAll();
    }

    @Get('stats')
    @ApiOperation({ summary: 'Obtener estadísticas de usuarios' })
    @ApiResponse({ status: 200, description: 'Estadísticas de usuarios.' })
    @ApiResponse({ status: 401, description: 'No autenticado.' })
    @ApiResponse({ status: 403, description: 'Sin permisos de administrador.' })
    getStats() {
        return this.adminService.getStats();
    }

    @Get('pending-verification')
    @ApiOperation({ summary: 'Obtener usuarios que aún no estan verificados' })
    @ApiOperation({ summary: 'Listar usuarios pendientes de verificación' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios pendientes de verificación.', type: [User] })
    findPendingVerification() {
        return this.adminService.findPendingVerification();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Datos del usuario.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.findOne(id);
    }

    @Patch(':id/verify')
    @ApiOperation({ summary: 'Verificar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario verificado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    verify(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.verify(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar datos de un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @ApiResponse({ status: 409, description: 'El email ya está en uso.' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.adminService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiResponse({ status: 204, description: 'Usuario eliminado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.remove(id);
    }
}
