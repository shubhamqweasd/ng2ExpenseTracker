import {Component} from '@angular/core'
import {AuthService} from '../services/auth.service.ts'

@Component({
	selector:'REGISTER',
	template:`
	<h1>	REGISTER </h1><li><a routerLink="/login">Login</a></li>
	<p>Username: <input type="text" size="25" [(ngModel)] = "user.name" required/></p>
	<p>Email: <input type="text" size="25" [(ngModel)] = "user.email" required/></p>
	<p>Password: <input type="password" size="25" [(ngModel)] = "user.password" required/></p>
	<p>
		<input type="submit" (click) = "submit(user)" value="Submit"/>
		<input type="reset" (click) = "clear()" value="Reset"/>
	</p>
	`,
	providers:[AuthService]
})

export class RegisterComponent{
	public user = {}

	constructor(private _Auth:AuthService){}

	submit = function(user){
		this._Auth.register(user).subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success){
				window.location.href="/login"
			} else {
				alert('ERROR TRY AGAIN')
			}
		})
	}

	clear = function(){
		this.user = {}
	}
}