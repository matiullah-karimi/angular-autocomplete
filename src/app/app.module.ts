import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputMaskModule } from 'src/input-mask';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent } from 'src/auto-complete/auto-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteComponent,
  ],
  imports: [
    BrowserModule,
    InputMaskModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
