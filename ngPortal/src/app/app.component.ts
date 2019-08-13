import { Component } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import 'firebase/performance';
firebase.initializeApp(environment.firebaseConfig);
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']//,
    // animations: [
    //     trigger('routeAnimation', [
    //         transition('1=>2, 1=>3, 1=>4, 2=>3, 2=>4, 3=>4', [
    //             style({ height: '!' }),
    //             query(':enter', style({ transform: 'translateX(100%)' })),
    //             query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
    //             // animate the leave page away
    //             group([
    //                 query(':leave', [
    //                     animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
    //                 ]),
    //                 // and now reveal the enter
    //                 query(':enter', [
    //                     animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))
    //                 ]),
    //             ]),
    //         ]),
    //         transition('4=>3, 4=>2, 4=>1, 3=>2, 3=>1, 2=>1', [
    //             style({ height: '!' }),
    //             query(':enter', style({ transform: 'translateX(-100%)' })),
    //             query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
    //             // animate the leave page away
    //             group([
    //                 query(':leave', [
    //                     animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
    //                 ]),
    //                 // and now reveal the enter
    //                 query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
    //             ]),
    //         ]),
    //     ])
    // ]
})
export class AppComponent {
    title = 'ngPortal';

    getDepth(outlet) {

        return outlet.activatedRouteData['depth'];

    }

}
