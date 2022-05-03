import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string='http://localhost:3000/data'
  loginUrl:string='http://localhost:3000/login'
  constructor(private http:HttpClient) { }

  employeesList(){
    return this.http.get(this.url)
  }

  getUser(id:string){
    return this.http.get(this.url + `/`+id)
  }

  addUser(obj:any){
    return this.http.post(this.url, obj)
  }

  deleteUser(id:any){
    return this.http.delete(this.url + `/`+id)
  }

  updateUser(id:any,obj:any){
    return this.http.put(this.url + `/`+id, obj)
  }
}
