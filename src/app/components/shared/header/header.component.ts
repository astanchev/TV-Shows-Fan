import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  @HostListener('document:click', ['$event']) DocumentClick(event: MouseEvent) {
    let target = (event.target as Element);

    if (target.classList.contains('mat-icon') && this.isNavOpen === false) {
      this.renderer.setStyle(this.sidenav.nativeElement, 'display', 'flex');
      this.isNavOpen = true;
    } else {
      this.renderer.setStyle(this.sidenav.nativeElement, 'display', 'none');
      this.isNavOpen = false;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event){
    let pageWidth: number = event.target.innerWidth;

    if (pageWidth > 899 && this.isNavOpen === true) {
      this.renderer.setStyle(this.sidenav.nativeElement, 'display', 'none');
      this.isNavOpen = false;
    }
  }

  isNavOpen: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

}
