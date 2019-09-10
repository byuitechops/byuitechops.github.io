import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app/';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { AuthService } from './auth.service';
import { listenToElementOutputs } from '@angular/core/src/view/element';
import { Kobiton } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {

    banners = [];
    activeBanners = [];
    orderedBanners = [];
    dots: number;
    img: any;

    constructor (
        private db: AngularFirestore, 
        private storage: AngularFireStorage, 
        public auth: AuthService
    ) {
        const stuff = this.db.collection('team/display/banners').get();
        stuff.forEach(raw => {
            raw.forEach(async banner => {
                const data = await banner.data();
                const id = await banner.id;
                const ref = this.storage.ref(`banner_images/${data.image}`);
                const url = ref.getDownloadURL();
                this.banners.push({
                    ...data,
                    url,
                    id
                });
            });
        });
    }

    getBanners() {
        return this.banners;
    }

    getActiveBanners() {
        this.activeBanners = [];
        setTimeout(() => {
            for(let i = 0; i < this.banners.length; i++) {
                if(this.banners[i].isActive) {
                    this.activeBanners.push(this.banners[i]);
                }
            }
            this.dots = this.activeBanners.length;
            this.orderBanners();
        }, 1000);
    }

    orderBanners() {
        this.orderedBanners = [];
        for(let i = 0; i < this.activeBanners.length; i++) {
            for(let j = 0; j < this.activeBanners.length; j++) {
                if(this.activeBanners[j].place == i) {
                    this.orderedBanners.push(this.activeBanners[j]);
                }
            }
        }
    }
}