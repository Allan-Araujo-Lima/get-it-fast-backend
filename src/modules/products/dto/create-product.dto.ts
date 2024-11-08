import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    description: string;
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    amount: number;
    @IsDateString()
    expiration: string
}
