import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/users.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  userId:string='';
  constructor(private activeRoute:ActivatedRoute,private userService: UserService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data:any)=>{
      this.userId=data.id;
    })

    if(this.userId){
      this.userService.deleteUser(this.userId).subscribe(data=>{
        console.log('delete successfully')
      })
    }
  }

}
