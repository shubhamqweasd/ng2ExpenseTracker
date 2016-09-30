/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,ComponentFixture,inject } from '@angular/core/testing'
import {ExpenseService} from '../../app/services/expense.service.ts'
import { HttpModule, JsonpModule } from '@angular/http'
import { Subject }    from 'rxjs/Subject'

let expenseService:ExpenseService
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

describe('User Service', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [ExpenseService],
		  imports:[HttpModule,JsonpModule]
		});
	});

	it('should return total amount', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.printWeekly(data).total).toEqual(13169);
	}))

	it('should return average amount', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.printWeekly(data).average).toEqual(13169/3);
	}))
	it('should return daily amount', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.printWeekly(data).expenses.length).toEqual(3);
	}))

	it('should return getExpenses observable', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.getExpenses().hasOwnProperty('_subscribe')).toBe(true);
	}))

	it('should return addExpense observable', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.addExpense({}).hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return addExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.addExpense(null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return addExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.addExpense(undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return addExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.addExpense('').hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return deleteExpense observable', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.deleteExpense(5).hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return deleteExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.deleteExpense(null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return deleteExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.deleteExpense(undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return deleteExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.deleteExpense('').hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return editExpense observable', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.editExpense(5,{}).hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return editExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.editExpense(null,null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.editExpense(5,undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.editExpense('',{}).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.editExpense(undefined,undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editExpense false', inject([ExpenseService], (expenseService: ExpenseService) => {
		expect(expenseService.editExpense(5,'').hasOwnProperty('_subscribe')).toBe(false);
	}))

});