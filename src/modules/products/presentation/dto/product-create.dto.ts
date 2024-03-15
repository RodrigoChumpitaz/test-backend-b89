import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    productName: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsNumber()
    @IsNotEmpty()
    stock: number;
    @IsString()
    @IsNotEmpty()
    category: string;
}
