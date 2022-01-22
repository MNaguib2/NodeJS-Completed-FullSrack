import { Component, OnDestroy, OnInit, ComponentFactoryResolver, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as load from '../Core/SpinnerRequest.interceptor';
import { NewPostComponent } from '../new-post/new-post.component';
import { PlaceholderDirective } from '../Core/placeholder.directive';
import { Post } from '../Core/POSTS.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  Loading: boolean = false;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;
  @Input() POSTS!: Observable<Post[]>;
  @Output() Body = new EventEmitter<any>();
  @Output() View = new EventEmitter<{id : number}>();


  POSTSItem !: Array<Post>;
  //Read More and Less
  content: Array<string> = [];
  isContentToggled: Array<boolean> = [];
  nonEditedContent: Array<string> = [];
  limit: number = 100;
  //Read More and Less

  //subscribe !: Subscription;



  constructor(private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
     load.Loading.subscribe(data => {
      this.Loading = data;
    },(error) => {
      console.log(error);
    });

   this.POSTS.subscribe(data => {
      this.POSTSItem = data;
      //console.log(data);
      this.nonEditedContent.splice(0,this.nonEditedContent.length);
      this.content.splice(0,this.content.length);
      for (let i = 0; i < data.length; i++) {        
        this.nonEditedContent.push(data[i].content);
        const limit2 = this.nonEditedContent[i].substr(0, this.limit).lastIndexOf(' ');
        if (limit2 > 0) {
          this.content[i] = `${this.nonEditedContent[i].substr(0, limit2)}...`;
        } else {
          this.content[i] = this.nonEditedContent[i];
        }
        this.isContentToggled.push(false);
      }
    });
  }
  ngOnDestroy(): void {
    //this.subscribe.unsubscribe();
  }

  NewPost() {
    this.showNewPOstAlert();
  }

  showNewPOstAlert() {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(NewPostComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
    componentRef.instance.Body.subscribe(data => {
      this.Body.emit(data);
    })
  }

  showButton(index: number) {
    const ButtonsPanel = document.getElementsByClassName("buttons")[index];
    ButtonsPanel.setAttribute("style", "  right:3px; top: 100%; padding-top:1%; animation-name: ShowBUttoNS; animation-duration: 1s; z-index: 1;");
  }
  HideButton(index: number) {
    const ButtonsPanel = document.getElementsByClassName("buttons")[index];
    ButtonsPanel.setAttribute("style", "  right:3px; top: 80%; animation-name: HideBUttoNS; animation-duration: 1s;");
  }

  toggleContent(id: number = 1) {
    this.isContentToggled[id] = !this.isContentToggled[id];
    const limit = this.nonEditedContent[id].substr(0, this.limit).lastIndexOf(' ');
    this.content[id] = this.isContentToggled[id] ? this.nonEditedContent[id] :
      this.content[id] = `${this.nonEditedContent[id].substr(0, limit)}...`;
    // if(this.isContentToggled[id]){
    // document.getElementById(`C${id}`).style.height = "auto";
    // }else{
    //   document.getElementById(`C${id}`).style.height = "19rem";
    // }
  }
  OnDeletePost(id:number) {
    //alert(id);
    this.http.delete(`http://localhost:3000/feed/post/${id}`).subscribe((result:any) => {
      //console.log(result);
      const Index = this.POSTSItem.findIndex(post => post.id === id);
      this.POSTSItem.splice(Index , 1);
      this.content.splice(Index , 1);
      this.isContentToggled.splice(Index , 1);
      this.nonEditedContent.splice(Index , 1);
      this.Body.emit(result);
    })
  }

  OnclickView(id: number){    
    this.http.get(`http://localhost:3000/feed/post/${id}`,{observe: 'response'}).subscribe((data : any) => {      
      if(data.status === 201 && data.body.post.id !== null){
        this.Body.emit(data.body);
        this.View.emit({id: id});
      }else{
        const message = {message : 'This ID is Not Exsit in DB'}
        this.Body.emit(message);
      }      
  });    
  }
}
