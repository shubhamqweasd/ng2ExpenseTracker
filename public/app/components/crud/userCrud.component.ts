import {Component,Input} from '@angular/core'
import {ExpenseService} from '../../services/expense.service.ts'
import {AuthService} from '../../services/auth.service.ts'
import {UserService} from '../../services/user.service.ts'

@Component({
	selector:'USERCRUD',
	template:`
	<div class="col-sm-6">
		<button (click) = "toggle('showAddUser')" class="btn btn-primary">ADD USER</button>
		<br>
		<div *ngIf="showAddUser">
			<form (submit) = "addUser()">
				<h4>ADD USER</h4>
				<p>NAME: <input class="form-control" type="text" size="25" [ngModelOptions]="{standalone: true}" [(ngModel)] = "usr.name" required/></p>
				<p>EMAIL: <input class="form-control" type="email" size="25" [ngModelOptions]="{standalone: true}" [(ngModel)] = "usr.email" required/></p>
				<p>PASSWORD: <input class="form-control" type="text" size="25" [ngModelOptions]="{standalone: true}" [(ngModel)] = "usr.password" required/></p>
				<p>ROLE: <select class="form-control" [ngModelOptions]="{standalone: true}" [(ngModel)] = "usr.role" required>
							<option *ngFor="let role of roles" value="{{role}}">{{role}}</option>
						</select>
				</p>
				<p>
					<input class="btn btn-primary" type="submit" value="Submit"/>
					<input class="btn btn-danger" type="reset" (click) = "toggle('showAddUser')" value="Cancel"/>
				</p>
			</form>
		</div>
		<div *ngIf="showEditUser">
			<form (submit) = "editUser(selectedUser._id,selectedUser)">
				<h4>EDIT USER</h4>
				<p>NAME: <input class="form-control" type="text" size="25" [ngModelOptions]="{standalone: true}" [(ngModel)] = "selectedUser.name" required/></p>
				<p>EMAIL: <input class="form-control" type="email" size="25" [ngModelOptions]="{standalone: true}" [(ngModel)] = "selectedUser.email" required/></p>
				<p>PASSWORD: <input class="form-control" type="text" size="25" placeholder="leave empty to keep same password" [ngModelOptions]="{standalone: true}" [(ngModel)] = "selectedUser.password"/></p>
				<p>ROLE: <select class="form-control" [ngModelOptions]="{standalone: true}" [(ngModel)] = "selectedUser.role" required>
							<option *ngFor="let role of roles" value="{{role}}">{{role}}</option>
						</select>
				</p>
				<p>
					<input class="btn btn-primary" type="submit" value="Submit"/>
					<input class="btn btn-danger" type="reset" (click) = "toggle('showEditUser')" value="Cancel"/>
				</p>
			</form>
		</div>
	</div>
	<br>
	<div class="col-sm-8 col-sm-offset-2">
		<table class="table table-striped">
			<tr>
				<th>EMAIL </th>
				<th>NAME </th>
				<th>ROLE </th>
				<th>EDIT</th>
				<th>DELETE</th>
			</tr>
			<tr *ngFor="let curr of users | paginate: { itemsPerPage: 5, currentPage: p }">
				<td>{{curr.email}}</td>
				<td>{{curr.name}}</td>
				<td>{{curr.role}}</td>
				<td><button (click) = toggleEditUsr(curr) class="btn btn-default">EDIT</button></td>
				<td><button (click) = delete(curr._id) class="btn btn-default">DELETE</button></td>
			</tr>
		</table>
		<pagination-controls (pageChange)="p = $event"></pagination-controls>
	</div>
	`,
	providers:[ExpenseService,UserService]
})

export class UserCrudComponent{
	public users = []
	public usr = {}
	public selectedUser = {}
	public showAddUser = false
	public showEditUser = false

	@Input('rolePermission') roles

	constructor(private _Expense:ExpenseService, private _Auth:AuthService, private _User:UserService){
		this._Auth.profile().subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success && ( data.data.role == 'manager' || data.data.role == 'admin') ){
				this._Auth.changeLoggedStatus({message:'LOGGEDIN',user:data.data})
				this.getAllUsers()
			} else {
				window.location.href = '/login'
			}
		})
	}

	getAllUsers = function(){
		this._User.getUsers().subscribe((data)=>{
			data = JSON.parse(data._body)
			this.users = data.data
		})
	}

	addUser = function(){
		this._User.addUser(this.usr).subscribe((data)=>{
			this.toggle('showAddUser')
			this.usr = {}
			this.getAllUsers()
		})
	}

	delete = function(id){
		this._User.deleteUser(id).subscribe((data)=>{
			this.getAllUsers()
		})
	}

	editUser = function(id,data){
		if(data.password == ''){
			delete data.password
		}
		this._User.editUser(id,data).subscribe((data)=>{
			this.toggle('showEditUser')
			this.selectedUser = {}
			this.getAllUsers()
		})
	}

	toggleEditUsr = function(currUsr){
		delete currUsr.password
		this.selectedUser = JSON.parse(JSON.stringify(currUsr))
		this.showEditUser = true
	}

	toggle = function(which){
		this[which] = !this[which]
	}

}