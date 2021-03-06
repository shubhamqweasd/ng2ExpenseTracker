import {Component} from '@angular/core'
import {AuthService} from '../services/auth.service.ts'
import { Router } from '@angular/router'

@Component({
	selector:'REGISTER',
	template:`
	<form class="form-signin" (submit) = "submit(user)">
        <h2 class="form-signin-heading">Please sign up</h2>
        <label for="inputName" class="sr-only">Email address</label>
        <input type="text" id="inputName" name="inputName" class="form-control" placeholder="Username" [(ngModel)] = "user.name" required autofocus>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email address" [(ngModel)] = "user.email" required>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" [(ngModel)] = "user.password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        <p>{{err}}</p>
     </form>
	`
})

export class RegisterComponent{
	public user = {}
	public err = ''

	constructor(private _Auth:AuthService, private _Router:Router){}

	submit = function(user){
		this._Auth.register(user).subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success){
				this._Router.navigate(['login'])
			}
		},(err)=>{
			var data = JSON.parse(err._body)
			this.err = data.message
		})
	}
}