import 'core-js'
import 'reflect-metadata'
import 'zone.js/dist/zone'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

//modules
import { AppModule } from './app/app.module.ts'

platformBrowserDynamic().bootstrapModule(AppModule)
