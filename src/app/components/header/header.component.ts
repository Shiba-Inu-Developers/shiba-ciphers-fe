import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;
  isMenuOpen = false; // State for mobile menu
  private authListenerSubs: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLogged = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.authStatusListener.subscribe(
      (isAuthenticated) => {
        this.isLogged = isAuthenticated;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle mobile menu
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
