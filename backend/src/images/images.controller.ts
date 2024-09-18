import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dtos/create-image.dto';
import { RenameImageDto } from './dtos/rename-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly service: ImagesService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Patch(':id')
  @HttpCode(204)
  async renameImage(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) { title }: RenameImageDto,
  ) {
    await this.service.renameImage(id, title);
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return { success: await this.service.deleteImage(id) };
  }

  @Post()
  async uploadImage(@Body(new ValidationPipe()) dto: CreateImageDto) {
    this.service.uploadImage(dto.title, dto.dataString);
  }
}
