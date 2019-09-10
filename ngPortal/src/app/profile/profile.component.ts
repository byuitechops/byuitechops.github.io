import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { defineBase } from '@angular/core/src/render3';
import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../core/auth.service';
import { SlideshowService } from '../core/slideshow.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    name = '';
    title = '';
    team = '';
    phone = '';
    email = '';
    birth = '';
    major = '';
    track = '';
    grad = '';
    about = '';

    isEditor = false;
    isManager = false;
    pointItems: any;

    editingBanners = false;
    editingThemes = false;
    editingAdminTools = false;

    activeBanners = [];
    orderedBanners = [];

    newBannerName = '';
    newBannerImage = '';
    newBannerLink = '';
    newBannerPlace = -1;
    newBannerIsActive = false;

    constructor(
        public db: AngularFirestore, 
        public auth: AuthService, 
        public slides: SlideshowService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.getUserInfo();
    }

    c(newTheme) {
        this.auth.updateTheme(newTheme);
    }

    selectPoints(item:string) {
        
    }

    getUserInfo() {
        setTimeout(() => {
            try {
                this.db.collection('users').doc(this.auth.id).get().subscribe(doc => {
                    this.name = this.auth.user.nameDisplay;
                    this.title = this.auth.user.title;
                    this.team = this.auth.user.team;
                    this.phone = this.auth.user.info.phoneNumber;
                    this.email = this.auth.user.info.email;
                    this.birth = this.auth.user.info.birthday;
                    this.major = this.auth.user.info.major;
                    this.track = this.auth.user.info.track;
                    this.grad = this.auth.user.info.graduation;
                    this.about = this.auth.user.info.aboutMe;

                    if(this.auth.user.admin || this.auth.user.lead) {
                        this.isEditor = true;
                        this.isManager = true;
                    }
                    if(this.auth.user.storeManager) {
                        this.isManager = true;
                    }
                    this.slides.getActiveBanners();
                });
            } catch (err) {
                setTimeout(() => {
                    console.log('Error retry in: 100ms');
                    this.getUserInfo();
                }, 100);
            }
        }, 200);
    }

    editBanners() {
        this.editingBanners = true;
    }

    onFileSelected(event) {
        console.log(event);
        this.newBannerName = event.target.files[0].name;
        this.newBannerImage = event.target.files[0];
    }
    onUpload() {
        const fd = new FormData;
        fd.append('image', this.newBannerImage, this.newBannerName)
        this.http.post('', fd).subscribe(res => {
            console.log(res);
        });
    }
    
    editThemes() {

    }

    editAdminTools() {

    }
}
