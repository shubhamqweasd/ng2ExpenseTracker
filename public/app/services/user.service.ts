import  { Injectable } from '@angular/core'
import { Http,Response } from '@angular/http'

@Injectable()
export class UserService{
	constructor(private _http:Http){}
	getUsers = function(){
		return this._http.get('/user/users')
	}
	addUser = function(data){
		return this._http.post('/auth/signup/local',data)
	}
	editUser = function(id,data){
		return this._http.put('/user/edit/'+id,data)
	}
	deleteUser = function(id){
		return this._http.delete('/user/delete/'+id)
	}
}
