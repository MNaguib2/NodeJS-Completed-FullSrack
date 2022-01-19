import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/Operators';
import { MainPageComponent } from '../main-page/main-page.component';


export var Loading = new BehaviorSubject(false);

export class LoadderSpinner implements HttpInterceptor {
   
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
{
    return next.handle(req).pipe(
        tap(event => {
         if(event.type === HttpEventType.Sent){            
            Loading.next(true); 
         }else if(event.type === HttpEventType.Response){
            Loading.next(false); 
         }
        }) // Ihave three way to LoadSpinner in this one and another in secShop another way and in E-learning Another way 
     ) 
}
}
