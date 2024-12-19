import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { UserService } from '../../../services/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private toastService: CustomToastrService
  ) {
    super(spinner);
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService
      .login(usernameOrEmail, password, () => {
        this.hideSpinner(SpinnerType.BallAtom);
      })
      .catch((error) => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.toastService.message(
          'Giriş başarısız! Lütfen bilgilerinizi kontrol edin.',
          'Hata',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      });
  }
}
