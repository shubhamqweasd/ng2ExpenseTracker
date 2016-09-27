import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateFilter'})
export class ExpensesPipe implements PipeTransform {
  transform(value, args) {
    if (!value || value.length == 0) return value
    if(args == '' || args == undefined || args == null || Date.parse(args) == NaN) return value
    return value.filter(x=>{
    	return this.getDateString(Date.parse(x.created_on)) == this.getDateString(Date.parse(args))
    })
  }

  getDateString(date){
  	if(date != NaN){
  		date = new Date(date)
  		return date.getYear().toString()+date.getMonth().toString()+date.getDate().toString()
  	}
  	return false
  }
}
