import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    description: string;
    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    @IsPositive()
    price: number;
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    amount: number;
    @IsDateString()
    expiration: string
}
