import { Injectable } from '@angular/core';

export const lightTheme = {
  first: '#0076c6',
  second: '#6c757d',
  third: '#343a40',
  background: '#ffffff',
  backgroundSecondary: '#ffffff',
  backgroundGrade: 'none',
  shadow: 'var(--gray)',
  fontPrime: '#000000'
};

export const darkTheme = {
  first: '#343a40',
  second: '#06439F',
  third: '#06439F',
  background: '#1c1b1b',
  backgroundSecondary: '#777777',
  backgroundGrade: 'none',
  shadow: 'none',
  fontPrime: '#ffffff'
};

export const jediTheme = {
  first: '#06439F',
  second: '#343a40',
  third: '#343a40',
  background: 'none',
  backgroundSecondary: '#ffffff',
  backgroundGrade: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
  shadow: 'var(--gray-dark)',
  fontPrime: '#000000'
};

export const sithTheme = {
  first: '#343a40',
  second: '#343a40',
  third: '#890000',
  background: '#1c1b1b',
  backgroundSecondary: '#777777',
  backgroundGrade: 'linear-gradient(180deg, rgba(36,0,0,1) 0%, rgba(121,9,9,1) 35%, rgba(255,0,0,1) 100%)',
  shadow: 'none',
  fontPrime: '#ffffff'
};

export const mericaTheme = {
  first: '#0076c6',
  second: '#343a40',
  third: '#ed2525',
  background: '#ffffff',
  backgroundSecondary: '#ffffff',
  // tslint:disable-next-line: max-line-length
  backgroundGrade: 'linear-gradient(9deg, rgba(255,0,0,1) 0%, rgba(221,59,59,1) 16%, rgba(235,208,208,1) 32%, rgba(255,255,255,1) 39%, rgba(191,230,241,1) 45%, rgba(69,163,190,1) 64%, rgba(51,83,185,1) 80%)',
  shadow: 'var(--gray)',
  fontPrime: '#000000'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {

  toggleLight() {
    this.setTheme(lightTheme);
  }

  toggleDark() {
    this.setTheme(darkTheme);
  }

  toggleJedi() {
    this.setTheme(jediTheme);
  }

  toggleSith() {
    this.setTheme(sithTheme);
  }

  toggleMerica() {
    this.setTheme(mericaTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
