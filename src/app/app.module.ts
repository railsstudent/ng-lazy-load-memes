import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageListComponentComponent } from './image-list-component/image-list-component.component';
import { WindowRef } from './WinRef';

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Title, WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
