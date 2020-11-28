import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { YoutubeService } from './youtube.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  videos: any[];
  private unsubscribe$: Subject<any> = new Subject();

  constructor( private youTubeService: YoutubeService) { }


  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }

      });
  }

}
