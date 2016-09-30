import  { Injectable } from '@angular/core'
import { Http,Response } from '@angular/http'
import { Subject }    from 'rxjs/Subject'

@Injectable()
export class AuthService{

	constructor(private _http:Http){}

	// Observable string sources
	private loggedStatus = new Subject<{message:string,user:{}}>();
	// Observable string streams
	loggedStatus$ = this.loggedStatus.asObservable();
	// Service message commands
	changeLoggedStatus = function(status) {
		this.loggedStatus.next(status);
	}

	login = function(user){
		if(!user || user == null || user == undefined || user == '') return false
		return this._http.post('/auth/login/local',user)
	}

	register = function(user){
		if(!user || user == null || user == undefined || user == '') return false
		return this._http.post('/auth/signup/local',user)
	}

	profile = function(){
		return this._http.get('/auth/profile')
	}

	logout = function(){
		return this._http.get('/auth/logout')
	}
}
