import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: 'videos', component: VideosComponent },
  { path: 'player/:itemId', component: PlayerComponent },
  { path: '', redirectTo: '/videos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
