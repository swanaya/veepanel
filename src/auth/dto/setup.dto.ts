import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, MinLength, IsOptional } from 'class-validator';

export class SetupDto {
  @ApiProperty({ example: 'currentpassword123' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsString()
  @MinLength(8)
  confirmPassword: string;

  @ApiProperty({ example: 'user@realdomain.com' })
  @IsEmail()
  newEmail: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  enable2FA: boolean;
} 