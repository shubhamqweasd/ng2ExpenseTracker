/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,ComponentFixture,inject } from '@angular/core/testing'
import {UserService} from '../../app/services/user.service.ts'
import { HttpModule, JsonpModule } from '@angular/http'
import { Subject }    from 'rxjs/Subject'

let userService:UserService

describe('User Service', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [UserService],
		  imports:[HttpModule,JsonpModule]
		});
	});

	it('should return getUsers observable', inject([UserService], (userService: UserService) => {
		expect(userService.getUsers().hasOwnProperty('_subscribe')).toBe(true);
	}))

	it('should return addUser observable', inject([UserService], (userService: UserService) => {
		expect(userService.addUser({}).hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return addUser false', inject([UserService], (userService: UserService) => {
		expect(userService.addUser(null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return addUser false', inject([UserService], (userService: UserService) => {
		expect(userService.addUser(undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return addUser false', inject([UserService], (userService: UserService) => {
		expect(userService.addUser('').hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return deleteUser observable', inject([UserService], (userService: UserService) => {
		expect(userService.deleteUser(5).hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return deleteUser false', inject([UserService], (userService: UserService) => {
		expect(userService.deleteUser(null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return deleteUser false', inject([UserService], (userService: UserService) => {
		expect(userService.deleteUser(undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return deleteUser false', inject([UserService], (userService: UserService) => {
		expect(userService.deleteUser('').hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return editUser observable', inject([UserService], (userService: UserService) => {
		expect(userService.editUser(5,{}).hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return editUser false', inject([UserService], (userService: UserService) => {
		expect(userService.editUser(null,null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editUser false', inject([UserService], (userService: UserService) => {
		expect(userService.editUser(5,undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editUser false', inject([UserService], (userService: UserService) => {
		expect(userService.editUser('',{}).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editUser false', inject([UserService], (userService: UserService) => {
		expect(userService.editUser(undefined,undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return editUser false', inject([UserService], (userService: UserService) => {
		expect(userService.editUser(5,'').hasOwnProperty('_subscribe')).toBe(false);
	}))

});