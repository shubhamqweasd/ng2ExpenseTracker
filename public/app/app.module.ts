import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

// componenrs
import { AppComponent } from './app.component.ts'
import { LoginComponent } from './components/login.component.ts'
import { RegisterComponent } from './components/register.component.ts'
import { ProfileComponent } from './components/profile.component.ts'
import { AdminComponent } from './components/admin.component.ts'

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'dash/admin', component: AdminComponent },
  { path: '**', component: LoginComponent}
]

@NgModule({
	declarations : [AppComponent,LoginComponent,RegisterComponent,ProfileComponent,AdminComponent],
	imports:[BrowserModule,FormsModule,HttpModule,JsonpModule,RouterModule.forRoot(routes)],
	bootstrap:[AppComponent]

})

export class AppModule {

}