import { Component, OnInit } from '@angular/core';
import { UserService} from "../../services/users.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  userId:string=''
  viewUser:any;
  constructor(private userService:UserService,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRouter.params.subscribe((data:any)=>{
      this.userId=data.id
    })

    this.userService.getUser(this.userId).subscribe(data=>{
      this.viewUser=data
    })
  }

}
