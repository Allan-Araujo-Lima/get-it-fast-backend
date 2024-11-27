import { IsDateString, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    description: string;
    @IsNotEmpty()
    @IsPositive()
    price: number;
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    amount: number;
    @IsDateString()
    expiration: string
}
