import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const server = 'https://hectorrp.com/api';
  const reqClone = req.clone({
    url: `${server}/${req.url}`,
  });
  return next(reqClone);
};
