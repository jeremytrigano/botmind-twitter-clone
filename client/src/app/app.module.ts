import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AuthComponent } from './auth/auth.component';
import { CoreModule } from './core/core.module';
import { Nl2brPipe } from './auth/nl2br.pipe';

@NgModule({
  declarations: [AppComponent, FormComponent, AuthComponent, Nl2brPipe],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
