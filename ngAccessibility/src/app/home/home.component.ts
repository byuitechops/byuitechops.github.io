import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DatabaseService } from '../core/database.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    ja = false;
    announce: string;

    constructor(public auth: AuthService, public db: DatabaseService) {
        this.announce = db.annouce.content;
        console.log(this.announce);
    }

    ngOnInit() {
    }



}
