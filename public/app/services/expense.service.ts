import  { Injectable } from '@angular/core'
import { Http,Response } from '@angular/http'

@Injectable()
export class ExpenseService{
	constructor(private _http:Http){}
	getExpenses = function(startDate,endDate){
		return this._http.get('/expense/created/'+startDate+"/"+endDate)
	}
	addExpense = function(data){
		if(!data || data == null || data == undefined || data == '') return false
		return this._http.post('/expense/add',data)
	}
	editExpense = function(id,data){
		if(!id || id == null || id == undefined || id == '') return false
		if(!data || data == null || data == undefined || data == '') return false
		return this._http.put('/expense/edit/'+id,data)
	}
	deleteExpense = function(id){
		if(!id || id == null || id == undefined || id == '') return false
		return this._http.delete('/expense/delete/'+id)
	}
	printWeekly = function(expenses){
		expenses = expenses
		.reduce((arr,x) => {
			for(var k in arr){
				if(arr[k].date == this.getDateString(Date.parse(x.created_on))){
					arr[k].data.push(x)
					return arr
				}
			}
			arr.push({
				date:this.getDateString(Date.parse(x.created_on)),
				timestamp: Date.parse(x.created_on),
				data:[x]
			})

			return arr
		},[])
		.map((x) => {
			var total = 0
			for(var k in x.data){
				total += x.data[k].amount
			}
			x.data = total
			return x
		})

		var total = expenses.reduce((sum,x) => {
			return sum + x.data
		},0)

		return {
			total : total,
			average : total/expenses.length,
			expenses : expenses
		}
		
	}

	getDateString(date){
	  	if(date != NaN){
	  		date = new Date(date)
	  		return date.getYear().toString()+date.getMonth().toString()+date.getDate().toString()
	  	}
	  	return false
  	}
}
