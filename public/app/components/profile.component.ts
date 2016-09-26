import {Component} from '@angular/core'
import {ExpenseService} from '../services/expense.service.ts'
import {AuthService} from '../services/auth.service.ts'

@Component({
	selector:'PROFILE',
	template:`
		<h2>USER PROFILE AND DASHBOARD <button (click) = "logout()">LOGOUT</button> </h2>
		<h3>Hi {{user.name}} - ( {{ user.email }} )</h3>
		<button (click) = "toggle('showAddExp')">ADD EXPENSE</button>
		<br>
		<div *ngIf="showAddExp">
			<h4>ADD EXPENSE</h4>
			<p>DESCRIPTION: <input type="text" size="25" [(ngModel)] = "exp.description" required/></p>
			<p>AMOUNT: <input type="text" size="25" [(ngModel)] = "exp.amount" required/></p>
			<p>COMMENT: <input type="text" size="25" [(ngModel)] = "exp.comment" required/></p>
			<p>
				<input type="submit" (click) = "addExpenese()" value="Submit"/>
				<input type="reset" (click) = "toggle('showAddExp')" value="Cancel"/>
			</p>
		</div>
		<div *ngIf="showEditExp">
			<h4>EDIT EXPENSE</h4>
			<p>DESCRIPTION: <input type="text" size="25" [(ngModel)] = "selectExp.description" required/></p>
			<p>AMOUNT: <input type="text" size="25" [(ngModel)] = "selectExp.amount" required/></p>
			<p>COMMENT: <input type="password" size="25" [(ngModel)] = "selectExp.comment" required/></p>
			<p>
				<input type="submit" (click) = "editExpenese(selectExp._id,selectExp)" value="Submit"/>
				<input type="reset" (click) = "toggle('showEditExp')" value="Cancel"/>
			</p>
		</div>
		<br>
		<table border='1'>
			<tr>
				<th>CREATED ON </th>
				<th>DESCRIPTION </th>
				<th>AMOUNT </th>
				<th>COMMENT </th>
				<th>EDIT</th>
				<th>DELETE</th>
			</tr>
			<tr *ngFor="let curr of expenses">
				<td>{{curr.created_on}}</td>
				<td>{{curr.description}}</td>
				<td>{{curr.amount}}</td>
				<td>{{curr.comment}}</td>
				<td><button (click) = toggleEditExp(curr)>EDIT</button></td>
				<td><button (click) = delete(curr._id)>DELEte</button></td>
			</tr>
		</table>
	`,
	providers:[ExpenseService,AuthService]
})

export class ProfileComponent{
	public expenses = []
	public user = {}
	public exp = {}
	public selectExp = {}
	public showAddExp = false
	public showEditExp = false

	constructor(private _Expense:ExpenseService, private _Auth:AuthService){
		this._Auth.profile().subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success && data.data.role == 'user'){
				this.user = data.data
				this.getAllExpenses()
			} else {
				window.location.href = '/login'
			}
		})
	}

	getAllExpenses = function(){
		this._Expense.getExpenses().subscribe((data)=>{
			data = JSON.parse(data._body)
			this.expenses = data.data
		})
	}

	addExpenese = function(){
		this._Expense.addExpense(this.exp).subscribe((data)=>{
			this.toggle('showAddExp')
			this.exp = {}
			this.getAllExpenses()
		})
	}

	delete = function(id){
		this._Expense.deleteExpense(id).subscribe((data)=>{
			this.getAllExpenses()
		})
	}

	editExpenese = function(id,data){
		this._Expense.editExpense(id,data).subscribe((data)=>{
			this.toggle('showEditExp')
			this.selectExp = {}
			this.getAllExpenses()
		})
	}

	toggleEditExp = function(currExp){
		this.selectExp = currExp
		this.showEditExp = true
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