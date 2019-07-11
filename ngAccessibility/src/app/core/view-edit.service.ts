import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ViewEditService {

  editing = false;
  comments = '';
  docEditURL = '.com';
  docPublishURL = '.pub';
  length = '108 seconds';
  parentTranscript = true;
  priority = '1';
  requestNotes = 'None';
  reviewer = 'Her';
  srcURL = '.com';
  step = 'Finished';
  title = 'Me';
  transcriber = 'You';
  type = 'Video';
  verbit = false;
  verbitID = '';

  locations = [{
    courseCode: 'testing',
    lmsURL: 'xesmoot.com',
    preparer: 'Me',
    requestor: 'I'
  }];
  id;

  hider = false;
  admin = false;
  counter = false;

  constructor(private db: DatabaseService, private auth: AuthService, private search: SearchService) {

  }


  async storageEdit(id) {
    this.check();
    this.id = id;
    const file = this.db.getTranscript(id);
    await file.then(async transcript => {
      const data = await transcript.data();
      this.comments = await data.notes;
      this.priority = await data.priority;
      this.docPublishURL = await data.docPublishURL;
      this.docEditURL = await data.docEditURL;
      this.length = await data.length;
      this.reviewer = await data.reviewer;
      this.title = await data.title;
      this.transcriber = await data.transcriber;
      this.type = await data.type;
      this.verbit = await data.verbit;
      this.verbitID = await data.verbitID;
      this.srcURL = await data.srcURL;
      this.step = await data.status;
      this.locations = data.location;
      });
    }
  check() {
    if (this.auth.user.isAnonymous) {
      this.hider = true;
    } else {
      this.hider = false;
    }
    if (this.db.user.lead) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  confirmEdit() {
    let data;
    if (this.docEditURL === undefined) {
      this.docEditURL = '';
    }
    if (this.docPublishURL === undefined) {
      this.docPublishURL = '';
    }
    if (this.comments === undefined) {
      this.comments = '';
    }
    try {
      data = {
        notes: this.comments,
        location: this.locations,
        docEditURL: this.docEditURL,
        docPublishURL: this.docPublishURL,
        length: this.length,
        parentTranscript: this.parentTranscript,
        priority: this.priority,
        srcURL: this.srcURL,
        status: this.step,
        title: this.title,
        type: this.type,
        verbit: this.verbit,
        verbitID: this.verbitID,
      };
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.db.updateTranscript(data, this.id);
        console.log(data);
        this.search.index.clearCache();
      }, 500);
    }
  }
  delete() {
    if (this.counter) {
      this.db.delete(this.id);
      this.counter = false;
      this.editing = false;
      return true;
    } else if (!this.counter) {
      alert('This action is not reverable, please be sure of this action.');
      this.counter = true;
      return false;
    }
  }
}
