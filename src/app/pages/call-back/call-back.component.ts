import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/crud/sofia/user.service';
import {CommandNavigatorService} from '../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-call-back',
  // templateUrl: './call-back.component.html',
  // styleUrls: ['./call-back.component.css']
  template: '',
  styles: []
})
export class CallBackComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private navigatorService: CommandNavigatorService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {

      localStorage.setItem('jwt_token', params['token']);

      if (params['token'] !== '') {
        this.userService.getCurrentUser().subscribe(
          data => {
            localStorage.setItem('loggedin_user', JSON.stringify(data));
            sessionStorage.setItem('sidebarMenu', JSON.stringify(data['sidebarMenu']));
            const loginNavCommand = data['loginNavCommand'];
            if (loginNavCommand == null || loginNavCommand === '') {
              this.router.navigateByUrl('/d-dashboard');
            } else {
              this.navigatorService.navigate(loginNavCommand);
            }
          },
          err => {
            localStorage.removeItem('jwt_token');
          }
        );
      }
    });
  }

}
