import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../Core/POSTS.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private http : HttpClient) { }
@Output() Items = new EventEmitter<{'Post': Post[] , 'message' : string}>();
@Input() Viewed !:string;
  ngOnInit(): void {
  }
  getFeed(){
    this.http.get('http://localhost:3000/feed/POSTAll').subscribe((data: any) => {
       //console.log(data);
       this.Items.emit({'Post': data.posts,'message': data.message});
    }, (err) => {
      console.log('this is Error In server ' , err)
    })
  }
}
