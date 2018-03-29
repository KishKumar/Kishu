import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Initialize users list
  users: IUser[]

  constructor(private _userService: UserService) { }

  loadUsers(): void {
    this._userService.getUser().subscribe(response => {
      this.users = response.data;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
}
