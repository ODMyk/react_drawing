import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './service_account';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    // const serviceAccount = {
    //   apiKey: process.env.FB_API_KEY,
    //   authDomain: process.env.FB_AUTH_DOMAIN,
    //   projectId: process.env.FB_PROJECT_ID,
    //   storageBucket: process.env.FB_STORAGE_BUCKET,
    //   messagingSenderId: process.env.FB_MESSAGEING_SENDER_ID,
    //   appId: process.env.FB_APP_ID,
    // };
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
