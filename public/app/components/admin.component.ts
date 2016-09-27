import {Component} from '@angular/core'

@Component({
	selector:'ADMIN',
	template:`
	<div class="col-sm-6 col-sm-offset-3">
		<div class="col-sm-6">
			<button class="btn btn-default form-control" (click) = "userSelected = true">MANAGE USERS</button>
		</div>
		<div class="col-sm-6">
			<button class="btn btn-default form-control" (click) = "userSelected = false">MANAGE EXPENSES</button>
		</div>
	</div>
	<USERCRUD [rolePermission] = "roles" *ngIf="userSelected"></USERCRUD>
	<EXPENSECRUD *ngIf="!userSelected"></EXPENSECRUD>
	`
})

export class AdminComponent{
	public userSelected = true
	public roles = [
		'user',
		'manager',
		'admin'
	]
}