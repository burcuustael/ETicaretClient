import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const router: Router = inject(Router);

  if (!_isAuthenticated) {
    spinner.show(SpinnerType.BallAtom);
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    toastrService.message('Oturum açmanız gerekiyor!', 'Yetkisiz Erişim!', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight,
    });

    spinner.hide(SpinnerType.BallAtom);
  }

  return true;
};
