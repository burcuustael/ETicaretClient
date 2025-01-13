import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { UserService } from '../../../services/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../services/ui/custom-toastr.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SocialAuthService,
  SocialUser,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private toastService: CustomToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner);
    socialAuthService.authState.subscribe((user: SocialUser) => {
      console.log(user);
    });
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService
      .login(usernameOrEmail, password, () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe((params) => {
          const returnUrl: string = params['returnUrl'];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          }
        });
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
