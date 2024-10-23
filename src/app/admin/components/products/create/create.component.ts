import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from '../../../../contracts/create_product';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent extends BaseComponent {
  constructor(
    spiner: NgxSpinnerService,
    private productService: ProductService
  ) {
    super(spiner);
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Resimleri sürükleyin veya seçin...',
    isAdminPage: true,
    accept: '.png, .jpg, .jpeg',
  };

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
    });

    this.createdProduct.emit(create_product);
  }
}
