import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common'
import { UserService } from './services/user.service';
import { RouterpathService } from 'src/app/services/routerpath.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userServices = inject(UserService);
  title = 'video-box';
  user: any = '';
  username: any = '';
  currentPath: string | undefined;

  constructor(private http: HttpClient, private routerPathService: RouterpathService, private location: Location) {}


  ngOnInit() {
    this.userServices.apiGetter(this.userServices.userUrl).subscribe((data) => {
      this.user = data;
    this.username = this.userServices.firstNameOnly(data.name)
    });
    this.routerPathService.currentPath$.subscribe((path)=>{
        this.currentPath = path;
    });
  }



  backClicked() {
    this.location.back();
  }
}
