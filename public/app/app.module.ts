import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

// componenrs
import { AppComponent } from './app.component.ts'
import { LoginComponent } from './components/login.component.ts'
import { RegisterComponent } from './components/register.component.ts'

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent}
]

@NgModule({
	declarations : [AppComponent,LoginComponent,RegisterComponent],
	imports:[BrowserModule,FormsModule,HttpModule,JsonpModule,RouterModule.forRoot(routes)],
	bootstrap:[AppComponent]

})

export class AppModule {

}