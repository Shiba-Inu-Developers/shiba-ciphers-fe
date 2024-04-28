import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s5-decipher-result',
  templateUrl: './s5-decipher-result.component.html',
  styleUrls: ['./s5-decipher-result.component.css'],
})
export class S5DecipherResultComponent implements OnInit {
  keyName: string = '';
  decryptedText: string = '';

  ngOnInit(): void {
    // Tu by ste mali načítať názov kľúča a dešifrovaný text z backendu
    // this.keyName = ...
    // this.decryptedText = ...
  }
}
