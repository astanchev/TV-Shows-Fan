import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  isNavOpen = false;

  @HostListener('document:click', ['$event']) DocumentClick(event: MouseEvent): void {
    const target = (event.target as Element);

    if (target.classList.contains('hamburger') && this.isNavOpen === false) {
      this.renderer.setStyle(this.sideNav.nativeElement, 'display', 'flex');
      this.isNavOpen = true;
    } else {
      this.renderer.setStyle(this.sideNav.nativeElement, 'display', 'none');
      this.isNavOpen = false;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event): void {
    const pageWidth: number = event.target.innerWidth;

    if (pageWidth > 899 && this.isNavOpen === true) {
      this.renderer.setStyle(this.sideNav.nativeElement, 'display', 'none');
      this.isNavOpen = false;
    }
  }


  get isAdmin(): boolean {
    return  this.userService.isAdmin;
  }

  get isLogged(): boolean {
    return  this.userService.isLogged;
  }

  constructor(
    private userService: UserService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
  }


  logoutHandler(): void {
    this.userService.logout();
  }
}
