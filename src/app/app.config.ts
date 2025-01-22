import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-3f14a", "appId": "1:880114849789:web:5cc1323a94a525b8262b94", "storageBucket": "ring-of-fire-3f14a.firebasestorage.app", "apiKey": "AIzaSyAW-5TYzE4l1QPPRq5RZ-RxyPf8dBvd7D4", "authDomain": "ring-of-fire-3f14a.firebaseapp.com", "messagingSenderId": "880114849789" })), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())]
};
