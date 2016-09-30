/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,ComponentFixture,inject } from '@angular/core/testing'
import {AuthService} from '../../app/services/auth.service.ts'
import { HttpModule, JsonpModule } from '@angular/http'
import { Subject }    from 'rxjs/Subject'

let authService:AuthService

describe('Auth Service', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [AuthService],
		  imports:[HttpModule,JsonpModule]
		});
	});

	it('should return profile observable', inject([AuthService], (authService: AuthService) => {
		expect(authService.profile().hasOwnProperty('_subscribe')).toBe(true);
	}))
	it('should return logout observable', inject([AuthService], (authService: AuthService) => {
		expect(authService.logout().hasOwnProperty('_subscribe')).toBe(true);
	}))

	it('should return login observable', inject([AuthService], (authService: AuthService) => {
		expect(authService.login({}).hasOwnProperty('_subscribe')).toBe(true);
	}))

	it('should return register observable', inject([AuthService], (authService: AuthService) => {
		expect(authService.register({}).hasOwnProperty('_subscribe')).toBe(true);
	}))

	it('should return login false', inject([AuthService], (authService: AuthService) => {
		expect(authService.login(null).hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return register false', inject([AuthService], (authService: AuthService) => {
		expect(authService.register(null).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return login false', inject([AuthService], (authService: AuthService) => {
		expect(authService.login(undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return register false', inject([AuthService], (authService: AuthService) => {
		expect(authService.register(undefined).hasOwnProperty('_subscribe')).toBe(false);
	}))
	it('should return login false', inject([AuthService], (authService: AuthService) => {
		expect(authService.login('').hasOwnProperty('_subscribe')).toBe(false);
	}))

	it('should return register false', inject([AuthService], (authService: AuthService) => {
		expect(authService.register('').hasOwnProperty('_subscribe')).toBe(false);
	}))

});