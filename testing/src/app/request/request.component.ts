import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  selectUndefinedOptionValue: any;
  name: string;
  lms: string;
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
  constructor() { }

  ngOnInit(){
    this.getCourse();
  }

  getCourse() {
    const courses = [];
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const x = [];
            const res = JSON.parse(this.responseText);
            const id = res._id;
            const newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const newres = JSON.parse(this.responseText);
                    let html = '';
                    newres.forEach((doc) => {
                      const course = doc.__catalogCourseId;
                      html += `<option>${course}</option>`;
                      courses.push(course);
                    });
                    console.log(courses);
                    document.getElementById('requestCourse').insertAdjacentHTML('afterend', html);
                    return courses;
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
  }
}

