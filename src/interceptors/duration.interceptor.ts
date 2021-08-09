import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log('ctx handler',context.getHandler());
    console.log('ctx class', context.getClass());
    console.log('request created At : ', dateIn);
    return next.handle().pipe(
      tap(
        () => {
          const dateOut = Date.now();
          console.log('request end At : ', dateOut);
          console.log(`Request duration : ${dateOut - dateIn} ms`)
        }
      )
    );
  }
}
