import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  preload: string = 'auto';
  userServices = inject(UserService);
  titleEdited: boolean = false;
  userEditTitle: boolean = true;
  isLoading: boolean = true;
  items: any[] = [];
  newItem: any = {};

  itemId: string | null | undefined;
  userService = inject(UserService);
  videoData: any;
  videoId: any;
  userData: any;
  titleToEdit: any;
  reactions: any[] | undefined;
  videoActiveUrl: SafeResourceUrl | undefined;
  reactionsUrl!: string;

  @ViewChild('videoPlayer', { static: false })
  videoPlayer: any;
  @ViewChild('canvas') canvas!: ElementRef;

  currentTime: number = 0;
  capturedFrame: any;

  onTimeUpdate(video: HTMLVideoElement): number {
    return (this.currentTime = video.currentTime);
  }

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.reactionsUrl = `http://localhost:3000/api/videos/${this.itemId}/reactions`;
    this.userService
      .apiGetter(this.userService.videoUrl + this.itemId)
      .subscribe((video) => {
        this.videoData = video;
        this.videoId = video.id;
        this.titleToEdit = video.title;
        this.videoActiveUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          video.url
        );
        this.isLoading = false;
      });
    this.loadItems(this.reactionsUrl);

    this.userService.apiGetter(this.userService.userUrl).subscribe((user) => {
      this.userData = user;
    });

    // if (this.userData.name != this.videoData.author.name || this.titleEdited) {
    //   this.userEditTitle = false;
    // }
  }

  loadItems(url: string) {
    this.userService.apiGetter(url).subscribe((reactions) => {
      this.reactions = reactions;
    });
  }

  postReactionSnap() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const image = this.videoPlayer.nativeElement;
    image.crossOrigin = 'anonymous';
    // image.src = 'http://localhost:4200/api/videos/'+ this.videoId;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('2D context is not supported.');
    }
    context.drawImage(image, 0, 0, 320, 180);
    const base64ImageData: string = canvas.toDataURL('image/png');

    const reactDemo = {
      videoId: this.videoId,
      timeframe: this.currentTime,
      type: 'snapshot',
      dataUri: base64ImageData,
    };
    this.userService.apiReaction(this.videoId, reactDemo);
    setTimeout(() => {
        this.loadItems(this.reactionsUrl);
      }, 2000);
  }
  postReactionStar() {
    const reactDemo = {
      videoId: this.videoId,
      timeframe: this.currentTime,
      type: 'star',
    };
    this.userService.apiReaction(this.videoId, reactDemo);
    setTimeout(() => {
        this.loadItems(this.reactionsUrl);
      }, 2000);
  }

  playVideoOnTimeFrame(time: number) {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = time;
    video.play();
  }

  pushTitle() {
    this.userService.apiUpdate(this.videoId, this.titleToEdit);
    this.titleEdited = true;
  }
}
