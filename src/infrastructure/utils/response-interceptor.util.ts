import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor<T>
  implements
    NestInterceptor<T, { success: boolean; data?: T; message?: string }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ success: boolean; data?: T; message?: string }> {
    return next.handle().pipe(map(data => data.content))
  }
}
