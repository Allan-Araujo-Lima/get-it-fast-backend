import { Injectable } from '@nestjs/common';

import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesDataService } from '../profiles_data/profiles_data.service';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';

@Injectable()
export class ProductsService {

  private AWS_S3_BUCKET = 'getitfast';

  private s3: AWS.S3;

  constructor(
    @InjectRepository(Products)
    private ProductsRepository: Repository<Products>,
    private readonly profileService: ProfilesDataService
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async create(userId: string, createProductDto: CreateProductDto) {
    const user = await this.profileService.findOneById(userId);
    return this.ProductsRepository.save({ ...createProductDto, user });
  }

  findAll() {
    return this.ProductsRepository.findAndCount();
  }

  findOne(id: string) {
    return this.ProductsRepository.findOne({ where: { id } });
  }

  findByUser(id: string) {
    return this.ProductsRepository.find({ relations: ['user'], where: { user: { id } } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }

  async uploadFile(file, productId) {
    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      productId,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
