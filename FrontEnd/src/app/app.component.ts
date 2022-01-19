import { Component, EventEmitter, Output } from '@angular/core';
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
  showItemsPost(POSTS : {'Post': Post[] , 'message' : string}){
    //console.log(POSTS);
    this.Items.emit(POSTS.Post);
    this.body = POSTS.message;
  }
  ShowMessage(body : any){
     this.body = body.message;
  }
}
