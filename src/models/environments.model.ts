import { FirebaseOptions } from "@angular/fire/app";

interface FirebaseEnvironmentSetup {
    production: boolean;
    config: FirebaseOptions;
}

export type { FirebaseEnvironmentSetup }