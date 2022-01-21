import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appRouting]'
})
export class RoutingDirective {
@Input() set appRouting(id : number){
      if(id != 0){
        this.container.createEmbeddedView(this.templateRef);
      }else{
        this.container.clear();
      }
    }
  constructor(private templateRef : TemplateRef<any> , 
    private container : ViewContainerRef,
    private http : HttpClient) {
    this.container.clear();
    
  }

}
