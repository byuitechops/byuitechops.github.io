import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { AuthService } from '../core/auth.service';
import { SearchService } from '../core/search.service';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  selectUndefinedOptionValue: any;
  name: string;
  lms: string;
  media: string;
  title: string;
  priority: string;
  priorities = [
      '1 ADA Emergency of Special Request',
      '2 Improvement Project for Live Course',
      '3 New/Re-Development Project',
      '4 Transcript Project'
  ];
  type: string;
  types = [
      'Video',
      'Audio',
      'Alt Text',
      'Slide'
  ];
  course: string;
  comments: string;
  override = false;

  dups = [{
    type: 'Video',
    courseCode: ['ACCTG100'],
    title: 'Testing',
    srcURL: 'yourface.com',
    priority: 1,
    docEditURL: 'youthinkthisisgoogle.google.com.pub',
    objectID: 'HAHAH'
  }];
  dupPage = 0;
  constructor(private db: DatabaseService, public auth: AuthService, private search: SearchService) {}

  ngOnInit() {
    this.getCourse();
    this.db.checkAction();
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
                        inject += `<option>${course}</option>`;
                        courses.push(course);
                    });
                    document.getElementById('requestCourse').insertAdjacentHTML('afterend', inject);
                    return courses;
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
    const html = `<option value="ENG106">ENG106</option>
                  <option value="ENG106L">ENG106L</option>
                  <option value="GSPC120L">GSPC120L</option>
                  <option value="MATH100G">MATH100G</option>
                  <option value="MATH100L">MATH100L</option>
                  <option value="PC101">PC101</option>
                  <option value="PC101L">PC101L</option>
                  <option value="PC102">PC102</option>
                  <option value="PC102L">PC102L</option>
                  <option value="PC103">PC103</option>
                  <option value="RELPC121">RELPC121</option>
                  <option value="RELPC122">RELPC122</option>
                  <option value="FDREL250">FDREL250</option>`;
    document.getElementById('requestCourse').insertAdjacentHTML('beforeend', html);
  }
  async newRequest() {
    if (this.course === undefined && this.type === undefined) {
      if ((this.lms === '' || this.lms === undefined) && (this.media === '' || this.media === undefined)) {
        if ((this.title === '' || this.title === undefined) && this.priority === undefined) {

            console.log('uh oh 1');
        }
        console.log('uh oh 2');
        alert('Please fill in all fields');
    } else {
        let displayName: string;

        if (this.auth.user.isAnonymous) {
            displayName = this.name;
        } else {
            displayName = this.db.user.name;
        }

        if (this.comments === undefined || this.comments === '') {
            this.comments = '';
        } else {
            this.comments = this.comments + 'Made by ' + displayName;
        }
        const data = {
            backupCode: this.course,
            copied: false,
            courseCode: [this.course],
            datePrepareFinished: '',
            docEditURL: '',
            docPublishURL: '',
            length: '',
            lmsURL: this.lms,
            parentTranscript: true,
            preparer: '',
            priority: this.priority,
            requestDate: new Date(),
            requestNotes: this.comments,
            requestor: displayName,
            srcURL: this.media,
            status: 'Ready for Prep',
            title: this.title,
            type: this.type,
            verbit: false,
            verbitID: ''
        };

        console.log(data);
        this.dups = await this.search.dupCheck(this.title, this.type, this.media);
        console.log(this.dups);
        if (this.override) {
            this.db.createTranscript(data);
            this.override = false;
            this.comments = '';
            this.media = '';
            this.type = undefined;
        } else if (this.dups.length >= 0) {
            console.log(this.dups);
            this.openDup();
        } else {
            this.db.createTranscript(data);
            this.comments = '';
            this.media = '';
            this.type = undefined;
        }

      }
    }
  }

  useDuplicate(id){
    this.db.addCourseCode(id, this.course);
    this.comments = '';
    this.media = '';
    this.type = undefined;
    this.closeDup();
  }

  createNew() {
    this.override = true;
    this.newRequest();
    }

  openDup() {
    const dup     = document.getElementById('dup-modal');
    const navbar  = document.getElementById('main-nav');
    const content = document.getElementsByTagName('main');

    dup.classList.remove('hide');
    navbar.classList.add('blur');
    for (let i = 0; i < content.length; i++) {
        content[i].classList.add('blur');
    }
  }

  closeDup() {
    const dup     = document.getElementById('dup-modal');
    const navbar  = document.getElementById('main-nav');
    const content = document.getElementsByTagName('main');

    dup.classList.add('hide');
    navbar.classList.remove('blur');
    for (let i = 0; i < content.length; i++) {
        content[i].classList.remove('blur');
    }
  }

}
