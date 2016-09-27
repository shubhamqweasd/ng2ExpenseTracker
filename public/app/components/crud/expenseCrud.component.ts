import {Component} from '@angular/core'
import {ExpenseService} from '../../services/expense.service.ts'
import {AuthService} from '../../services/auth.service.ts'

@Component({
	selector:'EXPENSECRUD',
	template:`
		<div class="col-sm-6">
			<button (click) = "toggle('showAddExp')" class="btn btn-primary">ADD EXPENSE</button>
			<br>
			<div *ngIf="showAddExp">
				<h4>ADD EXPENSE</h4>
				<p>DESCRIPTION: <input class="form-control" type="text" size="25" [(ngModel)] = "exp.description" required/></p>
				<p>AMOUNT: <input class="form-control" type="text" size="25" [(ngModel)] = "exp.amount" required/></p>
				<p>COMMENT: <input class="form-control" type="text" size="25" [(ngModel)] = "exp.comment" required/></p>
				<p>
					<input class="btn btn-primary" type="submit" (click) = "addExpenese()" value="Submit"/>
					<input class="btn btn-danger" type="reset" (click) = "toggle('showAddExp')" value="Cancel"/>
				</p>
			</div>
			<div *ngIf="showEditExp">
				<h4>EDIT EXPENSE</h4>
				<p>DESCRIPTION: <input class="form-control" type="text" size="25" [(ngModel)] = "selectExp.description" required/></p>
				<p>AMOUNT: <input class="form-control" type="text" size="25" [(ngModel)] = "selectExp.amount" required/></p>
				<p>COMMENT: <input class="form-control" type="text" size="25" [(ngModel)] = "selectExp.comment" required/></p>
				<p>
					<input class="btn btn-primary" type="submit" (click) = "editExpenese(selectExp._id,selectExp)" value="Submit"/>
					<input class="btn btn-danger" type="reset" (click) = "toggle('showEditExp')" value="Cancel"/>
				</p>
			</div>
		</div>
		<br>
		<div class="col-sm-8 col-sm-offset-2">
			<table class="table table-striped">
				<tr>
					<th>CREATED ON </th>
					<th>DESCRIPTION </th>
					<th>AMOUNT </th>
					<th>COMMENT </th>
					<th>EDIT</th>
					<th>DELETE</th>
				</tr>
				<tr *ngFor="let curr of expenses">
					<td>{{curr.created_on | date}}</td>
					<td>{{curr.description}}</td>
					<td>{{curr.amount}}</td>
					<td>{{curr.comment}}</td>
					<td><button (click) = toggleEditExp(curr) class="btn btn-default">EDIT</button></td>
					<td><button (click) = delete(curr._id) class="btn btn-default">DELEte</button></td>
				</tr>
			</table>
		</div>
	`,
	providers:[ExpenseService]
})

export class ExpenseCrudComponent{
	public expenses = []
	public user = {}
	public exp = {}
	public selectExp = {}
	public showAddExp = false
	public showEditExp = false

	constructor(private _Expense:ExpenseService, private _Auth:AuthService){
		this._Auth.profile().subscribe((data)=>{
			data = JSON.parse(data._body)
			if(data.success && ( data.data.role == 'user' || data.data.role == 'admin') ){
				this._Auth.changeLoggedStatus({message:'LOGGEDIN',user:data.data})
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