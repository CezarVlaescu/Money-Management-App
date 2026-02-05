import type { FirebaseEnvironmentSetup } from "../models/environments.model";

const firebaseEnvironment: FirebaseEnvironmentSetup = {
  production: false,
  config: {
    apiKey: "AIzaSyD8T8oAStWkEzCKLntI9aLpRdpEHtPpMBo",
    authDomain: "money-manager-db-8b327.firebaseapp.com",
    projectId: "money-manager-db-8b327",
    storageBucket: "money-manager-db-8b327.firebasestorage.app",
    messagingSenderId: "836225481993",
    appId: "1:836225481993:web:c6aa388c64db692f1aa7d8",
    measurementId: "G-X4CRPR4GXR"
  }
};

export const environments = { firebaseEnvironment };