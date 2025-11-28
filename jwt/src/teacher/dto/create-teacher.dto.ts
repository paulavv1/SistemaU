import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({
        description: "Name of the teacher",
        example: "John Doe"
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "Email of the teacher",
        example: "john.doe@example.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Phone number of the teacher",
        example: "1234567890",
        required: false
    })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({
        description: "Age of the teacher",
        example: 35,
        required: false
    })
    @IsNumber()
    @IsOptional()
    age?: number;

    @ApiProperty({
        description: "ID of the speciality",
        example: 1
    })
    @IsNumber()
    specialityId: number;

    @ApiProperty({
        description: "ID of the career",
        example: 1
    })
    @IsNumber()
    careerId: number;

    // 🚨 NUEVO CAMPO PARA LOGIN
    @ApiProperty({
        description: "Password of the teacher",
        example: "admin123"
    })
    @IsString()
    @MinLength(6)
    password: string;
}
