import { Injectable } from '@nestjs/common';

import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesDataService } from '../profiles_data/profiles_data.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private ProductsRepository: Repository<Products>,
    private readonly profileService: ProfilesDataService
  ) { }

  async create(userId: string, createProductDto: CreateProductDto) {
    const user = await this.profileService.findOneById(userId);
    return this.ProductsRepository.save({ ...createProductDto, user });
  }

  findAll() {
    return this.ProductsRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
