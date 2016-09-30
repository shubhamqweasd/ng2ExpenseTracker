/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,ComponentFixture } from '@angular/core/testing'
import { ExpensesPipe } from '../../app/pipes/expenses.pipe.ts'
import { Pipe, PipeTransform } from '@angular/core';

let expensesPipe
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


describe('pipe', () => {
	
  expensesPipe = new ExpensesPipe()

  it('should transform/filter expenses array according to start and end dates ',()=>{
  	let results = expensesPipe.transfrom(data,2016-09-21,2016-09-30)
  	expect(results).toEqual(data)
  })
});