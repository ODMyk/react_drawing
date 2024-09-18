import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fb: FirebaseService,
  ) {}

  async getAll() {
    const [files] = await this.fb.getStorageInstance().bucket().getFiles();
    const images = await this.prisma.image.findMany();
    const toReturn = [];
    for (const i of images) {
      const file = files.find((f) => f.name === i.id + '.png');
      const link = await file?.getSignedUrl({
        action: 'read',
        expires: new Date().getTime() + 300000,
      });
      toReturn.push({ ...i, link });
    }

    return toReturn;
  }

  async renameImage(id: number, title: string) {
    return await this.prisma.image.updateMany({
      where: { id },
      data: { title },
    });
  }

  async deleteImage(id: number) {
    const image = await this.prisma.image.findFirst({ where: { id } });
    if (!image) {
      return false;
    }
    const [files] = await this.fb.getStorageInstance().bucket().getFiles();

    await files.find((f) => f.name === id + '.png').delete();
    await this.prisma.image.deleteMany({ where: { id } });

    return true;
  }

  async uploadImage(title: string, dataString: string) {
    const base64EncodedImageString = dataString.replace(
      /^data:image\/\w+;base64,/,
      '',
    );
    const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');

    const image = await this.prisma.image.create({ data: { title } });

    const filename = `${image.id}.png`;
    const file = this.fb.getStorageInstance().bucket().file(filename);

    await file.save(imageBuffer, {
      metadata: { contentType: 'image/png' },
      public: true,
      validation: 'md5',
    });
  }
}
