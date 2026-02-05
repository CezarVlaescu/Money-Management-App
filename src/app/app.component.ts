import { Component, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private firebaseApp: FirebaseApp = inject<FirebaseApp>(FirebaseApp);
  private auth: Auth = inject<Auth>(Auth);
  private firestore: Firestore = inject<Firestore>(Firestore);
}
