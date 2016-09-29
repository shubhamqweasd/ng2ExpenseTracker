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
				<form (submit) = "addExpenese()">
					<h4>ADD EXPENSE</h4>
					<p>DESCRIPTION: <input class="form-control" type="text" size="25" [(ngModel)] = "exp.description" [ngModelOptions]="{standalone: true}" required/></p>
					<p>AMOUNT: <input class="form-control" type="number" size="25" [(ngModel)] = "exp.amount" [ngModelOptions]="{standalone: true}" required/></p>
					<p>COMMENT: <input class="form-control" type="text" size="25" [(ngModel)] = "exp.comment" [ngModelOptions]="{standalone: true}" required/></p>
					<p>
						<input class="btn btn-primary" type="submit" value="Submit"/>
						<input class="btn btn-danger" type="reset" (click) = "toggle('showAddExp')" value="Cancel"/>
					</p>
				</form>
			</div>
			<div *ngIf="showEditExp">
				<form (submit) = "editExpenese(selectExp._id,selectExp)">
					<h4>EDIT EXPENSE</h4>
					<p>DESCRIPTION: <input class="form-control" type="text" size="25" [(ngModel)] = "selectExp.description" [ngModelOptions]="{standalone: true}" required/></p>
					<p>AMOUNT: <input class="form-control" type="number" size="25" [(ngModel)] = "selectExp.amount" [ngModelOptions]="{standalone: true}" required/></p>
					<p>COMMENT: <input class="form-control" type="text" size="25" [(ngModel)] = "selectExp.comment" [ngModelOptions]="{standalone: true}" required/></p>
					<p>
						<input class="btn btn-primary" type="submit" value="Submit"/>
						<input class="btn btn-danger" type="reset" (click) = "toggle('showEditExp')" value="Cancel"/>
					</p>
				</form>
			</div>
		</div>
		<br>
		<div class="col-sm-8 col-sm-offset-2" *ngIf="!weeklyShow">
			<table class="table table-striped">
				<tr>
					<th>CREATED ON </th>
					<th>DESCRIPTION </th>
					<th>AMOUNT </th>
					<th>COMMENT </th>
					<th>EDIT</th>
					<th>DELETE</th>
				</tr>
				<tr>
					<td><input class="form-control" type="date" [(ngModel)] = "startDate" /></td>
					<td><input class="form-control" type="date" [(ngModel)] = "endDate" /></td>
					<td><button (click) = "startDate = '';endDate=''" class="btn btn-danger">CLEAR</button></td>
				</tr>
				<tr *ngFor="let curr of (expenses | dateFilter:startDate:endDate) | paginate: { itemsPerPage: 5, currentPage: p }">
					<td>{{curr.created_on | date:'yMMMdjms'}}</td>
					<td>{{curr.description}}</td>
					<td>{{curr.amount}}</td>
					<td>{{curr.comment}}</td>
					<td><button (click) = toggleEditExp(curr) class="btn btn-default">EDIT</button></td>
					<td><button (click) = delete(curr._id) class="btn btn-default">DELEte</button></td>
				</tr>
			</table>
			<pagination-controls (pageChange)="p = $event"></pagination-controls>
		</div>
		<button *ngIf="user.role == 'user' && !weeklyShow" class="btn btn-danger" style="margin-top:13px;" (click) = "printWeekly()">Print report</button>

		<div class="col-sm-8 col-sm-offset-2" *ngIf="weeklyShow">
			<table class="table table-striped">
				<tr>
					<th>CREATED ON </th>
					<th>Total Expense </th>
				</tr>
				<tr *ngFor="let current of reportDetails.expenses">
					<td>{{current.timestamp | date}}</td>
					<td>{{current.data}}</td>
				</tr>
			</table>
			<div class="col-sm-6">
				<table class="table table-striped">
					<tr>
						<th>Total Expense </th>
						<th>Average Expense </th>
					</tr>
					<tr>
						<td>{{reportDetails.total}}</td>
						<td>{{reportDetails.average}}</td>
					</tr>
				</table>
			</div>
		</div>
		<button *ngIf="user.role == 'user' && weeklyShow" class="btn btn-danger" style="margin-top:13px;" (click) = "weeklyShow = false">Back to Expenses</button>
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
	public reportDetails = {}
	public weeklyShow = false

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
		this.selectExp = JSON.parse(JSON.stringify(currExp))
		this.showEditExp = true
	}

	toggle = function(which){
		this[which] = !this[which]
	}

	printWeekly = function(){
		this.reportDetails = this._Expense.printWeekly(this.expenses)
		this.weeklyShow = true
	}

}