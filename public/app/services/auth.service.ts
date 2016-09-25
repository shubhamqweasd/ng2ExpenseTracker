import  { Injectable } from '@angular/core'
import { Http,Response } from '@angular/http'

@Injectable()
export class AuthService{
	constructor(private _http:Http){}
	login = function(user){
		return this._http.post('/auth/login/local',user)
	}
	register = function(user){
		return this._http.post('/auth/signup/local',user)
	}
}
