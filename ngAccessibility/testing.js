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

async dupCheck(data) {
  const t = data.title;
  const type = data.type;
  let src = data.srcURL;
  const results = new Array();
  src = await this.cleanSRC(src);
  console.log(src);
  this.index.search({
    query: t
  }).then(async x => {
    // tslint:disable-next-line: prefer-for-of
    for (let y = 0; y < x.hits.length; y++) {
      if (x.hits[y].type === type) {
        console.log(x.hits[y]);
        if ((x.hits[y].srcURL).includes(src)) {
          results.push(x.hits[y]);
          this.areThere = true;
        }
      }
    }
  });
  console.log(results);
  this.duplicates = results;
  return results;
}

this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
      console.log(documentSnapshot.data().title);
      var data = documentSnapshot.data();
      if (data.location === undefined) {
        this.afs.collection('accessibility').doc(documentSnapshot.id).update({
          location: [{
            courseCode: '',
            lmsURL: '',
            preparer: '',
            requester: ''
          }]
        });
      } else if (data.location[0].courseCode !== undefined && data.location[0].preparer === '') {
        this.afs.collection('accessibility').doc(documentSnapshot.id).update({
          location: [{
            courseCode: data.location[0].courseCode,
            lmsURL: data.location[0].lmsURL,
            preparer: '',
            requester: ''
          }]
        });
      }
  });
});
