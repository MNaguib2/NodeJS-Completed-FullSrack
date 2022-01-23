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
  homeandfeed : string = 'Feed';
  post !: Post;

  showItemsPost(POSTS : {'Post': Post[] , 'message' : string}){    
    this.homeandfeed = 'Feed';
    this.Items.emit(POSTS.Post);    
    if(this.IdView == 0){
      this.body = POSTS.message;
    }else{
      this.body = "Now In Home Page";
      this.IdView = 0;    
    }    
  }

  ShowMessage(body : any){
     this.body = body.message;
    if(body.post){
      this.post = body.post;
    }
  }
  
  OpenViewPost(event: {id : number}){
    this.homeandfeed = 'Home';
      this.IdView = event.id;
  }
}
