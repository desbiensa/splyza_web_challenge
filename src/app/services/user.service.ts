import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  listView = false;

  videoUrl = 'http://localhost:3000/api/videos/';
  userUrl = 'http://localhost:3000/api/users/self';

  constructor(private http: HttpClient) {}

  firstName: string = '';

  firstNameOnly(name: string): string {
    const names = name.split(' ');
    if (names.length > 0) {
      return (this.firstName = names[0]);
    } else {
      return (this.firstName = name);
    }
  }

  convertTimeStamp(time: number): string {
    const totalSeconds = time;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  }

  apiGetter(url: string): Observable<any> {
    return this.http.request('GET', url, {
      responseType: 'json',
    });
  }

  apiUpdate(id: string, updateTitle: string) {
    const url = `${this.videoUrl}${id}`;
    this.http
      .patch(url, { title: updateTitle })
      .subscribe();
  }

  apiReaction(id: string, bodyRequest: any) {
    const url = `${this.videoUrl}${id}/reactions`;
    this.http.post(url, bodyRequest).subscribe()
  }
}
