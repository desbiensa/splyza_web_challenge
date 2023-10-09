import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './player/player.component';

import { FormsModule } from '@angular/forms';
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  declarations: [AppComponent, VideosComponent, PlayerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
