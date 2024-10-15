import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { error } from 'node:console';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(product: Create_Product, successCallBack?: any) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const error = errorResponse.error;
        }
      );
  }

  async read(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<List_Product[]> {
    const promiseData = this.httpClientService
      .get<List_Product[]>({
        controller: 'products',
      })
      .toPromise();

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );

    return await promiseData;
  }
}
