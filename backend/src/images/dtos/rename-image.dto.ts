import { IsString } from 'class-validator';

export class RenameImageDto {
  @IsString()
  title: string;
}
