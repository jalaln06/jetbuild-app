
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeCheckInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {const timeTaken = Date.now() - now
        const response = context.switchToHttp().getResponse()
        response.cookie('X-Response-Time', `${timeTaken}ms`)},
        ),
);
  }
}
