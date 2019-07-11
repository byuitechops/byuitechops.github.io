import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEditService } from '../core/view-edit.service';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-view-edit',
    templateUrl: './view-edit.component.html',
    styleUrls: ['./view-edit.component.css']
})

export class ViewEditComponent implements OnInit {

    @ViewChild('content') content: any;
    priorities = [
        '1',
        '2',
        '3',
        '4'
    ];
    types = [
        'Video',
        'Audio',
        'Alt Text',
        'Slide'
    ];
    stages = [
        'Ready for Prep',
        'In Prep',
        'Ready for Transcription',
        'In Transcription',
        'Ready for Review',
        'In Review',
        'Review Completed',
        'Finished'
    ];
    constructor(public storage: ViewEditService, private auth: AuthService) { }

    ngOnInit() {

    }

    getCourse() {
      const courses = [];
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          const res = JSON.parse(this.responseText);
          const id = res._id;
          const newxhttp = new XMLHttpRequest();
          newxhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              const newres = JSON.parse(this.responseText);
              let inject = '';
              newres.forEach((doc) => {
              const course = doc.__catalogCourseId;
              inject += `<option [value]="${course}">${course}</option>`;
              courses.push(course);
              });
              let content = document.getElementsByClassName('requestCourse');
              for (let i = 0; i < content.length; i++) {
                content[i].insertAdjacentHTML('afterend', inject);
              }
              return courses;
          }
          };
          newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
          newxhttp.send();
      }
      };
      try {
        xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
        xhttp.send();
        const html = `<option [value]="ENG106">ENG106</option>
                        <option [value]="ENG106L">ENG106L</option>
                        <option [value]="GSPC120L">GSPC120L</option>
                        <option [value]="MATH100G">MATH100G</option>
                        <option [value]="MATH100L">MATH100L</option>
                        <option [value]="PC101">PC101</option>
                        <option [value]="PC101L">PC101L</option>
                        <option [value]="PC102">PC102</option>
                        <option [value]="PC102L">PC102L</option>
                        <option [value]="PC103">PC103</option>
                        <option [value]="RELPC121">RELPC121</option>
                        <option [value]="RELPC122">RELPC122</option>
                        <option [value]="FDREL250">FDREL250</option>`;
        let content = document.getElementsByClassName('requestCourse');
        for (let i = 0; i < content.length; i++) {
          content[i].insertAdjacentHTML('afterend', html);
        }
      } catch (error) {
        console.log(error);
      }
    }


    async openModal(id) {
      const modal       = document.getElementById('view-modal');
      const navbar      = document.getElementById('main-nav');
      const content     = document.getElementsByTagName('main');
      modal.classList.remove('hide');
      navbar.classList.add('blur');
      for (let i = 0; i < content.length; i++) {
          content[i].classList.add('blur');
      }
      this.storage.storageEdit(id);
    }

    closeModal() {
      const modal    = document.getElementById('view-modal');
      const navbar   = document.getElementById('main-nav');
      const content  = document.getElementsByTagName('main');
      modal.classList.add('hide');
      navbar.classList.remove('blur');
      for (let i = 0; i < content.length; i++) {
          content[i].classList.remove('blur');
      }
      this.storage.editing = false;
    }
    clickedOut(event) {
      if (event.target.className === 'modal') {
          this.closeModal();
      }
    }

    confirmEdit() {
      this.storage.confirmEdit();
      this.storage.editing = false;
    }
    edit() {
      setTimeout(() => {
        this.getCourse();
      }, 500);
      this.storage.editing = !this.storage.editing;
    }
    delete() {
      if (this.storage.delete()) {
        this.closeModal();
      }
    }
}

