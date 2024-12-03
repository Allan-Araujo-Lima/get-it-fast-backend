import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const userId = "teste teste";

        const fileExtension = extname(file.originalname);

        const fileName = `${userId}${fileExtension}`;

        callback(null, fileName);
      },
    })
  }))
  async create(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Array<Express.Multer.File>,
  ) {

    const userId = req.profile_data?.sub;

    console.log("UploadedFiles", file);

    return await this.productsService.create(userId, createProductDto);
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
