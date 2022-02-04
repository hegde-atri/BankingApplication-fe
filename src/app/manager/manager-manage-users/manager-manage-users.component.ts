import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-manager-manage-users',
  templateUrl: './manager-manage-users.component.html',
  styleUrls: ['./manager-manage-users.component.scss']
})
export class ManagerManageUsersComponent implements OnInit {
  pageTitle = "Manage users";


  constructor() { }

  ngOnInit(): void {
  }

  addUser(){
    window.open('https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_managersignin&client_id=7c6dfea2-ff7b-4e36-8b11-08410e69f4e2&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A4200&scope=openid&response_type=id_token&prompt=login');
  }

  editUser(){
    window.open('');
  }

}
