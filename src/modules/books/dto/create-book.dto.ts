import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  authors!: string;

  @ApiProperty()
  @IsString()
  favorite?: string;

  @ApiProperty()
  @IsString()
  fileCover?: string;

  @ApiProperty()
  @IsString()
  fileBook?: string;
}
