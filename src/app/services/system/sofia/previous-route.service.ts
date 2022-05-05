import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {
  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  public navigateToPrevPage() {
    // const navUrl = this.previousUrl;
    // console.log(navUrl);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      //  console.log('http://localhost:5000/' + navUrl);
      this.router.navigate([this.previousUrl])
    });
  }

}
