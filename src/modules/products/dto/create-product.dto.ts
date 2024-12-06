import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsPositive } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    description: string;
    @IsNotEmpty()
    @IsNumberString()
    price: number;
    @IsNotEmpty()
    @IsNumberString()
    amount: number;
    @IsDateString()
    expiration: string
}