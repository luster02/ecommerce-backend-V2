import {
    Controller, Get, Delete,
    HttpCode, Param, ParseIntPipe,
    Body, ValidationPipe, UsePipes, Post
} from '@nestjs/common';
import { GalleryService } from './gallery.service'
import { CustomResponse } from 'src/interfaces/Response.interface';
import { GalleryDto } from './dto/gallery.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
    constructor(private readonly _galleryService: GalleryService) { }

    @Get(':id')
    @HttpCode(200)
    async getOneGallery(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const gallery = await this._galleryService.get(id)
        return { ok: true, data: gallery }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteGallery(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._galleryService.delete(id)
        return { ok: true, data: 'deleted' }
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    async createFoler(@Param('id', ParseIntPipe) id: number, @Body() gallerData: GalleryDto): Promise<CustomResponse> {
        await this._galleryService.createFoler(id, gallerData)
        return { ok: true, data: 'updated' }
    }
}
