import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s2k-decrypt',
  templateUrl: './s2k-decrypt.component.html',
  styleUrls: ['./s2k-decrypt.component.css'],
})
export class S2kDecryptComponent implements OnInit {
  isTutorialPage: boolean = false;
  backendText: string = '';

  constructor(private imageService: ImageService, private router: Router) {
    // Získanie aktuálnej URL cesty
    const currentUrl = this.router.url;
    // Overenie, či aktuálna URL cesta zodpovedá tutoriálovej URL ceste
    this.isTutorialPage = currentUrl.includes('tutorial-key-stepper');
  }

  ngOnInit() {}
}
