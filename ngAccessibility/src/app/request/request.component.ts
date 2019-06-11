import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getCiphers } from 'tls';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
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
  courseList;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.courseList = this.getCourse();
    console.log(this.courseList);
  }

  getCourse() {
    var courses = [];
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let x = [];
            const res = JSON.parse(this.responseText);
            const id = res._id;
            const newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const newres = JSON.parse(this.responseText);
                    newres.forEach((doc) => {
                      const course = doc['__catalogCourseId'];
                      courses.push(course);
                    });
                    console.log(courses);
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

