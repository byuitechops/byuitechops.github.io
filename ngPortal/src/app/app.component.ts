import { Component } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import 'firebase/performance';
firebase.initializeApp(environment.firebaseConfig);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'ngPortal';

    getDepth(outlet) {

        return outlet.activatedRouteData['depth'];

    }

}
