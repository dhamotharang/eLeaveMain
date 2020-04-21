import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  CryptoJS = require('crypto-js');

  public ROOT_URL = 'http://zencore.zen.com.my:3000';

  public jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(
    private apiService: ApiService
  ) { }

  login(emailValue: string, passwordValue: string) {
    const encryptPass = (this.CryptoJS.SHA256(passwordValue)).toString(this.CryptoJS.enc.Hex);
    return this.apiService.postApiLogin({ loginId: emailValue, password: encryptPass }, '/api/auth/login/local').pipe(
      map(data => {
        return data;
      })
    );
  }
}
