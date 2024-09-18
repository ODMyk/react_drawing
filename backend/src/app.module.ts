import { Module, OnModuleInit } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';
import { config } from 'dotenv';

@Module({
  imports: [ImagesModule, PrismaModule, FirebaseModule],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    config();
  }
}
