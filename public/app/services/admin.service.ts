import  { Injectable } from '@angular/core'
import { Http,Response } from '@angular/http'

@Injectable()
export class AdminService{
	constructor(private _http:Http){}
	getUsers = function(){
		return this._http.get('/admin/users')
	}
	addUser = function(data){
		return this._http.post('/auth/signup/local',data)
	}
	editUser = function(id,data){
		return this._http.put('/admin/edit/'+id,data)
	}
	deleteUser = function(id){
		return this._http.delete('/admin/delete/'+id)
	}
}
