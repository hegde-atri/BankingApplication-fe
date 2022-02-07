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
    window.open('https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_managersignin&client_id=583f7fec-46ac-46e1-97f4-9cc9f931ad80&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fsuper-stonks.herokuapp.com%2Fhome&scope=openid&response_type=id_token&prompt=login', "_blank");
  }

  editUser(){
    window.open('https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_editProfile&client_id=583f7fec-46ac-46e1-97f4-9cc9f931ad80&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fsuper-stonks.herokuapp.com%2Fhome&scope=openid&response_type=id_token&prompt=login', "_blank");
  }

}
