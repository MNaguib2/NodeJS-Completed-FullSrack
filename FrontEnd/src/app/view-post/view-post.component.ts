import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../Core/POSTS.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
@Input() Post !: Post;
  constructor() { }

  ngOnInit(): void {
    }

}
