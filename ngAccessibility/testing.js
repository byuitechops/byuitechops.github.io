this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    if (this.count <= 1) {
      console.log(documentSnapshot.data().title);
      var data = documentSnapshot.data();
      let location = [];
      let i = 0;
      this.afs.collection('accessibility').doc(documentSnapshot.id).set({
        docEditURL: data.docEditURL,
        docPublishURL: data.docPublishURL,
        length: data.length,
        priority: data.priority,
        notes: data.notes,
        srcURL: data.srcURL,
        status: data.status,
        title: data.title,
        type: data.type,
        verbit: data.verbit,
        verbitID: data.verbitID
      }).then(() => {
        if (data.location !== undefined) {
          if (data.location[0].preparer === undefined) {
            location[i] = {
              courseCode: data.location.courseCode,
              lmsURL: data.location.lmsURL,
              preparer: '',
              requester: ''
            };
          } else if (data.location === []) {
            location[i] = {
              courseCode: '',
              lmsURL: '',
              preparer: '',
              requester: ''
            };
          } else {
            location[i] = {
              courseCode: data.location[i].courseCode,
              lmsURL: data.location[i].lmsURL,
              preparer: data.location[i].preparer,
              requester: data.location[i].requester
            };
          }
          this.afs.collection('accessibility').doc(documentSnapshot.id).update({
            location
          });
        } else if (data.location === undefined) {
          if (data.courseCode !== undefined) {
            if (data.courseCode.length >= 1) {
              (data.courseCode).forEach(code => {
                location[i] = {
                  courseCode: code,
                  lmsURL: data.lmsURL,
                  preparer: data.preparer,
                  requester: data.requester
                };
                i++;
              });
            }
          } else {
            location[i] = {
              courseCode: '',
              lmsURL: '',
              preparer: '',
              requester: ''
            };
          }
          this.afs.collection('accessibility').doc(documentSnapshot.id).update({
            location
          });
        }
      });
      this.count++;
    }
  });
});

this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(documentSnapshot.data().title);
    var data = documentSnapshot.data();
    if (data.courseCode === undefined) {

    } else {
      let preparer = '';
      let requester = '';
      if (data.preparer !== undefined) {
        preparer = data.preparer;
      }
      if (data.requestor !== undefined) {
        requester = data.requestor;
      }
      this.afs.collection('accessibility').doc(documentSnapshot.id).update({
        location: [{
          courseCode: data.courseCode,
          lmsURL: data.lmsURL,
          preparer,
          requester
        }]
      });
    }
  });
});
this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(documentSnapshot.data().title);
    var data = documentSnapshot.data();
    if (data.guestCreated === undefined) {
      this.afs.collection('accessibility').doc(documentSnapshot.id).update({
        guestCreated: false
      });

    } else {

    }
  });
});


this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    let x = {};
    console.log(documentSnapshot.data().title);
    var data = documentSnapshot.data();
    if (data.courseCode !== undefined) {
      if (data.location.courseCode !== undefined) {
        x.location[0].courseCode = data.location.courseCode;
        x.location[0].lmsURL = data.location.lmsURL;
        if (data.location.preparer !== undefined) {
          x.location[0].preparer = data.location.preparer;
        } else {
          x.location[0].preparer = '';
        }
        if (data.location.requestor !== undefined) {
          x.location[0].requestor = data.location.requestor;
        } else {
          x.location[0].requestor = '';
        }
      } else {
        if (data.location[0] !== undefined) {
          if (data.location[0].courseCode !== undefined) {
            if (data.location[0].courseCode[0] !== undefined) {
              let i = 0
              (data.location[0].courseCode).forEach(course => {
                x.location[i].courseCode = course;
                x.location[i].lmsURL = data.location.lmsURL;
                x.location[i].preparer = data.location.preparer;
                x.location[i].requestor = data.location.requester;
                i++;
              });
            }
          } else {
            x.location[0].courseCode = '';
            x.location[0].lmsURL = '';
            x.location[0].preparer = '';
            x.location[0].requestor = '';
          }
        }
      }
    } else {
      if (data.location[0] !== undefined) {
        if (data.location[0].courseCode === undefined) {
          x.location[0].courseCode = '';
          x.location[0].lmsURL = '';
          x.location[0].preparer = '';
          x.location[0].requestor = '';
        } else {
          x.location[0].courseCode = data.location.courseCode;
          if (data.location.lmsURL !== undefined) {
            x.location[0].lmsURL = data.location.lmsURL;
          } else {
            x.location[0].lmsURL = '';
          }
          x.location[0].preparer = '';
          x.location[0].requestor = '';
        }
      }
    }
    x.docEditURL = data.docEditURL;
    x.docPublishURL = data.docPublishURL;
    if (data.guestCreated === undefined) {
      x.guestCreated = false;
    } else {
      x.guestCreated = data.guestCreated;
    }
    x.length = data.length;
    x.priority = data.priority;
    x.notes = data.notes;
    x.srcURL = data.srcURL;
    x.status = data.status;
    x.title = data.title;
    x.type = data.type;
    x.verbit = data.verbit;
    x.verbitID = data.verbitID;
  });
});



