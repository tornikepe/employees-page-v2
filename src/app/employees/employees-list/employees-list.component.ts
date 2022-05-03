import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { UserService} from "../../services/users.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  newArr: any = [];
  usersList: any;
  startingItem: any;
  itemPerLoad: any = 5;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.employeesList().subscribe((data) => {
      this.usersList = data;
      this.onLoad();
    });
  }

  onLoad() {
    const startingItem = this.newArr.length;
    const itemPerLoad = this.itemPerLoad;
    this.newArr = this.usersList.slice(0, startingItem + itemPerLoad);
  }

  logOut(){
    localStorage.removeItem('id')
  }

  edit(id:string):boolean{
    return localStorage.getItem('id')!=id;

  }

}
