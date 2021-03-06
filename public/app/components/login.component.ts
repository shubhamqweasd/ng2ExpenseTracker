import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service.ts'
import { Router } from '@angular/router'

@Component({
	selector:'LOGIN',
	template:`
	<form class="form-signin" (submit) = "submit(user)">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="text" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email address" [(ngModel)] = "user.email" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" [(ngModel)] = "user.password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p>{{err}}</p>
     </form>
	`
})

export class LoginComponent{
	public user = {}
	public err = ''

	constructor(private _Auth:AuthService, private _Router:Router){}

	submit = function(user){
		this._Auth.login(user).subscribe((data)=>{			
			data = JSON.parse(data._body)
			if(data.success){
				if(data.role == 'user'){
					this._Router.navigate(['dash/user'])
				}
				if(data.role == 'admin'){
					this._Router.navigate(['dash/admin'])
				}
				if(data.role == 'manager'){
					this._Router.navigate(['dash/manager'])
				}
			}
		},(err)=>{
			var data = JSON.parse(err._body)
			this.err = data.message
		})
	}
}