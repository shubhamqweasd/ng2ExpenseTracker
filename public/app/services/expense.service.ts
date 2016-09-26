import  { Injectable } from '@angular/core'
import { Http,Response } from '@angular/http'

@Injectable()
export class ExpenseService{
	constructor(private _http:Http){}
	getExpenses = function(){
		return this._http.get('/expense/created')
	}
	addExpense = function(data){
		return this._http.post('/expense/add',data)
	}
	editExpense = function(id,data){
		return this._http.put('/expense/edit/'+id,data)
	}
	deleteExpense = function(id){
		return this._http.delete('/expense/delete/'+id)
	}
}
