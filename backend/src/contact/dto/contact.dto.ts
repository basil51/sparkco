import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Company name cannot exceed 100 characters' })
  company?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'Phone number cannot exceed 20 characters' })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Service cannot exceed 50 characters' })
  service?: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MinLength(10, { message: 'Message must be at least 10 characters long' })
  @MaxLength(2000, { message: 'Message cannot exceed 2000 characters' })
  message: string;
}
