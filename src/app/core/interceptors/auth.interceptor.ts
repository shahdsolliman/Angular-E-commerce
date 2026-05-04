import { HttpInterceptorFn } from '@angular/common/http';
import { STORED_KEYS } from '../constants/storedkeys';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(STORED_KEYS.TOKEN);
  
  if (token) {
    req = req.clone({
      setHeaders: {
        token: token,
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
