import {Component} from '@angular/core'

@Component({
	selector:'MANAGER',
	template:`
		<USERCRUD [rolePermission] = "roles"></USERCRUD>
	`
})

export class ManagerComponent{
	public roles = [
		'user'
	]

}