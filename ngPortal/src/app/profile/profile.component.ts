import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { defineBase } from '@angular/core/src/render3';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    pointItems = this.db.collection('team').doc('points').collection('pointItems');

    constructor(public db: AngularFirestore, public auth: AuthService) { }

    ngOnInit() {
    }

    c(newTheme) {
        this.auth.updateTheme(newTheme);
    }

    selectPoints(item:string) {
        
    }
}