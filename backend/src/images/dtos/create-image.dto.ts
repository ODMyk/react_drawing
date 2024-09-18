import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  title: string;

  @IsString()
  dataString: string;
}
