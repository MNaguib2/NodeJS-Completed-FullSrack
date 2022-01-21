import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Core/POSTS.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';
  @Output('Items') Items = new EventEmitter<Post[]>()
  body !: string;
  IdView : number = 0;

  showItemsPost(POSTS : {'Post': Post[] , 'message' : string}){
    this.IdView = 0;
    this.Items.emit(POSTS.Post);
    this.body = POSTS.message;
  }

  ShowMessage(body : any){
     this.body = body.message;
  }
  
  OpenViewPost(event: {id : number}){
      this.IdView = event.id;
  }
}
