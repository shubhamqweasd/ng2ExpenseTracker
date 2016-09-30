/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { TestBed,ComponentFixture } from '@angular/core/testing'
import { AppComponent } from '../../app/app.component'
import { RouterModule } from '@angular/router'
import { FormsModule }   from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'
import {Ng2PaginationModule} from 'ng2-pagination'
import {APP_BASE_HREF} from '@angular/common';

import {AuthService} from '../../app/services/auth.service.ts'

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
]
let comp : AppComponent
let fixture: ComponentFixture<AppComponent>
let authService

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ], // declare the test component
      imports:[FormsModule,HttpModule,JsonpModule,RouterModule.forRoot(routes),Ng2PaginationModule],
      providers:    [AuthService,{provide: APP_BASE_HREF, useValue : '/' }]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance; // AppComponent test instance
    authService = TestBed.get(AuthService)
  });

  it('should have a property isLogged',()=>{
  	expect(comp.isLogged).toBe(false)
  })

  it('initial user object to be blank',()=>{
  	expect(comp.user).toEqual({})
  })

});