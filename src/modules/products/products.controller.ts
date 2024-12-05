import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const tempFileName = `${Date.now()}-${file.originalname}`;
        callback(null, tempFileName); // Nome temporário
      },
    }),
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes = ['image/png', 'image/jpeg'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new BadRequestException('Apenas arquivos PNG e JPG são permitidos!'), false);
      }
    }
  }))

  async create(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.profile_data?.sub;
    const product = await this.productsService.create(userId, createProductDto);

    const productId = product.id;

    const oldPath = file.path; // Recolhe o nome temporário do arquivo
    const newPath = join('./uploads', `${productId}${extname(file.originalname)}`);
    fs.renameSync(oldPath, newPath); // Atualiza o nome para o ID do produto cadastrado

    return product;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
