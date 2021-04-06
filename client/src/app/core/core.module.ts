import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, AuthService } from './services';

@NgModule({
  imports: [CommonModule],
  providers: [ApiService, AuthService],
  declarations: [],
})
export class CoreModule {}
