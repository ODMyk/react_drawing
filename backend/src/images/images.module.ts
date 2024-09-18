import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [PrismaModule, FirebaseModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
