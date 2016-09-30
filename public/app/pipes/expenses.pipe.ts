import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateFilter'})
export class ExpensesPipe implements PipeTransform {
  transform(value, startDate, endDate) {
    console.log(startDate)
    if (!value || value.length == 0) return value
    if(startDate == '' || startDate == undefined || startDate == null || Date.parse(startDate) == NaN) return value
    if(endDate == '' || endDate == undefined || endDate == null || Date.parse(endDate) == NaN) return value
    return value.filter(x=>{
    	return this.getDateString(Date.parse(x.created_on)) >= this.getDateString(Date.parse(startDate)) && this.getDateString(Date.parse(x.created_on)) <= this.getDateString(Date.parse(endDate))
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
