import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsArray()
    roles: number[] | unknown[];

    @IsOptional()
    @IsString()
    token: string;
}
