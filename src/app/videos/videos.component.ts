import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  userServices = inject(UserService);
  videos: any;

  datePipe = new DatePipe('en-US');
  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit() {
    this.userServices.apiGetter(this.userServices.videoUrl).subscribe((data) => {
      this.videos = data;
    });
  }

  goToPlayer(itemId: string) {
    this.router.navigate(['/player', itemId])
  }

  //This would technically be managed through state management NgRx
  turnToGrid() {
    this.userServices.listView = false;
  }
  turnToList() {
    this.userServices.listView = true;
  }
}
