import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }
  ngOnInit(): void {}
}
