import {Component} from '@angular/core'
import {AuthService} from './services/auth.service.ts'

@Component({
	selector:'my-app',
	template:`
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <a class="navbar-brand" href>ng2 Expense Tracker</a>
	    </div>
	    <div style="float:right;margin-top: 7px;">
	        <button *ngIf="!isLogged" class="btn btn-primary" routerLink="/login">LOGIN</button>
	        <button *ngIf="!isLogged" class="btn btn-danger" routerLink="/register">SIGNUP</button>
	        <button *ngIf="isLogged" class="btn btn-default">{{user.name}}</button>
	        <button *ngIf="isLogged" class="btn btn-danger" (click) = "logout()">LOGOUT</button>
	    </div>
	  </div><!-- /.container-fluid -->
	</nav>
	<router-outlet></router-outlet>
	`,
	providers:[AuthService]
})

export class AppComponent{
	public isLogged = false
	public user = {}

	constructor(private _Auth:AuthService){
		_Auth.loggedStatus$
		.subscribe((data)=>{
			if(data.message == 'LOGGEDIN'){
				this.isLogged = true
				this.user = data.user
			}
		})
	}

	logout = function(){
		this._Auth.logout().subscribe((res)=>{
			// refresh app after logout
			window.location.href = '/login'
		})
	}
}