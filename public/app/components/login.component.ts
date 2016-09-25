import {Component} from '@angular/core'
import {AuthService} from '../services/auth.service.ts'

@Component({
	selector:'LOGIN',
	template:`
	<h1>	LOGIN </h1><li><a routerLink="/register">Register</a></li>
	<p>Username: <input type="text" size="25" [(ngModel)] = "user.email" required/></p>
	<p>Password: <input type="password" size="25" [(ngModel)] = "user.password" required/></p>
	<p>
		<input type="submit" (click) = "submit(user)" value="Submit"/>
		<input type="reset" (click) = "clear()" value="Reset"/>
	</p>
	`,
	providers:[AuthService]
})

export class LoginComponent{
	public user = {}

	constructor(private _Auth:AuthService){}

	submit = function(user){
		this._Auth.login(user).subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success){
				window.location.href = '/auth/profile'
			} else {
				alert('ERROR TRY AGAIN')
			}
		})
	}

	clear = function(){
		this.user = {}
	}
}