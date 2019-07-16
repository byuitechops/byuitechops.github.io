import { Component } from '@angular/core';
import { trigger, transition, group, query, style, animate } from '@angular/animations';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import 'firebase/performance';
firebase.initializeApp(environment.firebaseConfig);
const perf = firebase.performance();


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

    // https://www.youtube.com/watch?v=yPKSpuso6K0
    // is the video I used for this part, the slidey animations between tabs
    animations: [
        trigger('routeAnimation', [
            transition('1=>2, 1=>3, 1=>4, 1=>5, 1=>6, 1=>7, 2=>3, 2=>4, 2=>5, 2=>6, 2=>7, 3=>4, 3=>5, 3=>6, 3=>7, 4=>5, 4=>6, 4=>7, 5=>6, 5=>7, 6=>7', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(100%)' })),
                query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
                // animate the leave page away
                group([
                    query(':leave', [
                        animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                    ]),
                    // and now reveal the enter
                    query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
                ]),
            ]),
            transition('7=>6, 7=>5, 7=>4, 7=>3, 7=>2, 7=>1, 6=>5, 6=>4, 6=>3, 6=>2, 6=>1, 5=>4, 5=>3, 5=>2, 5=>1, 4=>3, 4=>2, 4=>1, 3=>2, 3=>1, 2=>1', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(-100%)' })),
                query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
                // animate the leave page away
                group([
                    query(':leave', [
                        animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                    ]),
                    // and now reveal the enter
                    query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
                ]),
            ]),
        ])
    ]
})
export class AppComponent {
  title = 'ngAccessibility';

  getDepth(outlet) {
      return outlet.activatedRouteData['depth'];
  }
}
