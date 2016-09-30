/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,ComponentFixture } from '@angular/core/testing'
import { ExpensesPipe } from '../../app/pipes/expenses.pipe.ts'
import { Pipe, PipeTransform } from '@angular/core';

let expensesPipe:ExpensesPipe
const data = [
	{
		id: "57ec8dda6042b9189698854a",
		amount: 2323,
		comment: "wefwefwef",
		created_by: "test",
		created_on: "2016-09-29T03:43:22.218Z",
		description: "dcdc"
	},
	{
		id: "57ec8ddad6042b9189698854a",
		amount: 2523,
		comment: "wefwefwef",
		created_by: "test",
		created_on: "2016-09-28T03:43:22.218Z",
		description: "dcdc"
	},
	{
		id: "57ec8dda6042b9189698854a",
		amount: 8323,
		comment: "wefwefwef",
		created_by: "test",
		created_on: "2016-09-27T03:43:22.218Z",
		description: "dcdc"
	}
]


describe('pipe expenses', () => {
expensesPipe = new ExpensesPipe()

	it('should transform/filter expenses array according to start and end dates ',()=>{
		expect(expensesPipe.transform(data,'2016-09-21','2016-09-30').length).toEqual(3)
	})
	it('should transform/filter expenses array according to start and end dates ',()=>{
		expect(expensesPipe.transform(data,'2016-09-21','2016-09-23').length).toEqual(0)
	})
	it('should transform/filter expenses array according to start and end dates ',()=>{
		expect(expensesPipe.transform(data,'2016-09-21','2016-09-28').length).toEqual(2)
	})
	it('should return all on null input ',()=>{
		expect(expensesPipe.transform(data,null,null).length).toEqual(3)
	})
	it('should return all on blank input ',()=>{
		expect(expensesPipe.transform(data,'','').length).toEqual(3)
	})
	it('should return all on undefined input ',()=>{
		expect(expensesPipe.transform(data,undefined,undefined).length).toEqual(3)
	})
	it('should return value if empty value ',()=>{
		expect(expensesPipe.transform([],undefined,undefined).length).toEqual(0)
	})
	it('should return value if empty or undefined value ',()=>{
		expect(expensesPipe.transform(undefined,undefined,undefined)).toEqual(undefined)
	})

});