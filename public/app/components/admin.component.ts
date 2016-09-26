import {Component} from '@angular/core'
import {ExpenseService} from '../services/expense.service.ts'
import {AuthService} from '../services/auth.service.ts'
import {AdminService} from '../services/admin.service.ts'

@Component({
	selector:'ADMIN',
	template:`
		<h2>ADMIN PROFILE AND DASHBOARD <button (click) = "logout()">LOGOUT</button> </h2>

		<button (click) = "toggle('showAddUser')">ADD USER</button>
		<br>
		<div *ngIf="showAddUser">
			<h4>ADD USER</h4>
			<p>NAME: <input type="text" size="25" [(ngModel)] = "usr.name" required/></p>
			<p>EMAIL: <input type="text" size="25" [(ngModel)] = "usr.email" required/></p>
			<p>PASSWORD: <input type="text" size="25" [(ngModel)] = "usr.password" required/></p>
			<p>ROLE: <select [(ngModel)] = "usr.role" required>
						<option value="user">USER</option>
						<option value="manager">MANAGER</option>
						<option value="admin">ADMIN</option>
					</select>
			</p>
			<p>
				<input type="submit" (click) = "addUser()" value="Submit"/>
				<input type="reset" (click) = "toggle('showAddUser')" value="Cancel"/>
			</p>
		</div>
		<div *ngIf="showEditUser">
			<h4>EDIT USER</h4>
			<p>NAME: <input type="text" size="25" [(ngModel)] = "selectedUser.name" required/></p>
			<p>EMAIL: <input type="text" size="25" [(ngModel)] = "selectedUser.email" required/></p>
			<p>PASSWORD: <input type="text" size="25" placeholder="leave empty to keep same password" [(ngModel)] = "selectedUser.password" required/></p>
			<p>ROLE: <select [(ngModel)] = "selectedUser.role" required>
						<option value="user">USER</option>
						<option value="manager">MANAGER</option>
						<option value="admin">ADMIN</option>
					</select>
			</p>
			<p>
				<input type="submit" (click) = "editUser(selectedUser._id,selectedUser)" value="Submit"/>
				<input type="reset" (click) = "toggle('showEditUser')" value="Cancel"/>
			</p>
		</div>
		<br>
		<table border='1'>
			<tr>
				<th>EMAIL </th>
				<th>NAME </th>
				<th>ROLE </th>
				<th>EDIT</th>
				<th>DELETE</th>
			</tr>
			<tr *ngFor="let curr of users">
				<td>{{curr.email}}</td>
				<td>{{curr.name}}</td>
				<td>{{curr.role}}</td>
				<td><button (click) = toggleEditUsr(curr)>EDIT</button></td>
				<td><button (click) = delete(curr._id)>DELEte</button></td>
			</tr>
		</table>
	`,
	providers:[ExpenseService,AuthService,AdminService]
})

export class AdminComponent{
	public users = []
	public usr = {}
	public selectedUser = {}
	public showAddUser = false
	public showEditUser = false

	constructor(private _Expense:ExpenseService, private _Auth:AuthService, private _Admin:AdminService){
		this._Auth.profile().subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success && data.data.role == 'admin'){
				this.getAllUsers()
			} else {
				window.location.href = '/login'
			}
		})
	}

	getAllUsers = function(){
		this._Admin.getUsers().subscribe((data)=>{
			data = JSON.parse(data._body)
			this.users = data.data
		})
	}

	addUser = function(){
		this._Admin.addUser(this.usr).subscribe((data)=>{
			this.toggle('showAddUser')
			this.exp = {}
			this.getAllUsers()
		})
	}

	delete = function(id){
		this._Admin.deleteUser(id).subscribe((data)=>{
			this.getAllUsers()
		})
	}

	editUser = function(id,data){
		if(data.password == ''){
			delete data.password
		}
		this._Admin.editUser(id,data).subscribe((data)=>{
			this.toggle('showEditUser')
			this.selectedUser = {}
			this.getAllUsers()
		})
	}

	toggleEditUsr = function(currExp){
		delete currExp.password
		this.selectedUser = currExp
		this.showEditUser = true
	}

	toggle = function(which){
		this[which] = !this[which]
	}

	logout = function(){
		this._Auth.logout().subscribe((res)=>{
			window.location.href = '/login'
		})
	}
}