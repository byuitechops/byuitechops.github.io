import {
  Injectable
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  ThemeService
} from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = false;
  email: string;
  password: string;
  dName: string;
  user: any;
  id: string;
  signingIn = true;
  selectedTheme;

  navbarImage = '';
  constructor(private afs: AngularFireAuth, private db: AngularFirestore, public theme: ThemeService) {
    this.afs.auth.onAuthStateChanged(user => {
      if (user) {
        this.auth = true;
        this.findUser();
      } else {
        console.log('Failed');
        this.auth = false;
      }
    });
  }

  login() {
    this.afs.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(async () => {
        window.location.replace('home.html');
        this.findUser();
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Please, check information provided and try again.');
        // ...
      });
  }

  async findUser() {
    try {
      this.dName = this.afs.auth.currentUser.displayName;
    } catch (err) {
      console.log(err.message);
    }
    try {
      const users = await this.db.collection('users', ref => ref.where('name', '==', this.dName)).get();
      users.subscribe(x => {
        if (x.size > 0 && x.size < 2) {
          this.user = x.docs[0].data();
          this.selectedTheme = this.user.viewMode;
          this.id = x.docs[0].id;
          setTimeout(() => {
            this.changeTheme();
          }, 100);
        } else {
          alert('Contact your database administrator with error code 5012');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  signup() {
    if (!this.signingIn) {
      if (this.dName === '' || this.email === '' || this.password === '') {
        alert('Please make sure all fields are filled');
        return;
      }
      this.afs.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          const docData = {
            admin: false,
            nameDisplay: `${this.dName}`,
            name: `${this.dName}`,
            team: 'default',
            lead: false,
            info: {
              email: `${this.email}`,
              photo: 'default-image.png',
              phoneNumber: '000-000-0000',
              major: '',
              track: '',
              graduation: '',
              speed: '',
              birthday: '00/00'
            },
            title: 'Team Member',
            viewMode: 'light',
            storeManager: false,
            time: {
              break: false,
              check: false,
              breakKey: '',
              checkKey: '',
              accumulatedTime: 4
            }

          };
          try {
            // Send to firebase
            this.afs.auth.currentUser.updateProfile({
              displayName: `${this.dName}`
            }).then(() => {
              // Update successful.
              window.location.replace('home.html');
            }).catch((error) => {
              // An error happened.
            });
            console.log(docData);
            this.db.collection('users').doc(this.db.createId()).set(docData).then(() => {
              console.log('Written');
              console.log(this.afs.auth.currentUser);

              // window.replace('home.html')
            });
          } catch (err) {
            // If it did not work alert user
            alert(err);
          }
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          alert('Check the information input and try again');
        });
    } else {
      this.signingIn = !this.signingIn;
    }
  }

  cancel() {
    this.signingIn = !this.signingIn;
  }

  logout() {
    this.afs.auth.signOut();
  }

  updateTheme(newTheme) {
    try {
      this.db.collection('users').doc(this.id).update({
        viewMode: newTheme
      }).then(() => {
        console.log('Success');
      }).catch(err => {
        console.log('Failed: ' + err.message);
      });
      this.selectedTheme = newTheme;
      setTimeout(() => {
        this.changeTheme();
      }, 100);
    } catch (err) {
      console.log(err.message);
    }
  }

  changeTheme() {
    switch (this.selectedTheme) {
      case 'light':
        this.theme.toggleLight();
        break;
      case 'dark':
        this.theme.toggleDark();
        break;
      case 'jedi':
        this.theme.toggleJedi();
        break;
      case 'sith':
        this.theme.toggleSith();
        break;
      case 'merica':
        this.theme.toggleMerica();
        break;
    }
  }
}
