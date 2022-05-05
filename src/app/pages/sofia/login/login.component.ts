import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/crud/sofia/user.service';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../services/system/sofia/auth/auth.service';
import {NotificationService} from '../../../services/system/sofia/notification.service';
import {Router} from '@angular/router';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentDate: Date = new Date();
  username = '';
  password = '';

  googleURL = environment.serverUrl + '/oauth2/authorization/google?redirect_uri=' + environment.frontendUrl + '/callback';
  facebookURL = environment.serverUrl + '/oauth2/authorization/facebook?redirect_uri=' + environment.frontendUrl + '/callback';
  keycloakURL = environment.serverUrl + '/oauth2/authorization/keycloak?redirect_uri=' + environment.frontendUrl + '/callback';
  githubURL = environment.serverUrl + '/oauth2/authorization/github?redirect_uri=' + environment.frontendUrl + '/callback';
  linkedinURL = environment.serverUrl + '/oauth2/authorization/linkedin?redirect_uri=' + environment.frontendUrl + '/callback';

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private userService: UserService,
              private router: Router,
              private navigatorService: CommandNavigatorService) {
  }

  ngOnInit(): void {
  }

  authenticateUser(): void {

    if (this.username === '') {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-id-card', '<b>Login Error</b> Please fill in your username');
      return;
    }

    if (this.password === '') {
      this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-id-card', '<b>Login Error</b> Please fill in your password');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      data => {

        localStorage.setItem('jwt_token', data.accessToken);
        localStorage.setItem('loggedin_user', JSON.stringify(data.user));
        sessionStorage.setItem('sidebarMenu', JSON.stringify(data.user['sidebarMenu']));
        const loginNavCommand = data.user['loginNavCommand'];
        if (loginNavCommand == null || loginNavCommand === '') {
          this.router.navigateByUrl('/d-dashboard');
        } else {
          this.navigatorService.navigate(loginNavCommand);
        //  console.log(loginNavCommand);
        }
      }
      // err => {
      //   this.notificationService.showNotification('top', 'center', 'alert-danger', 'fa-id-card',
      //     err.error.message);
      // }
    );
  }

  onEnterMethod() {
    this.authenticateUser();
  }

}
