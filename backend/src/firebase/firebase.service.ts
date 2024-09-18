import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './service_account';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: process.env.FB_STORAGE_BUCKET,
    });
    this.storage = admin.storage();
  }

  getStorageInstance() {
    return this.storage;
  }
}
