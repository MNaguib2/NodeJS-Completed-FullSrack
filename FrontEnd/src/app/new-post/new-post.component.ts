import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Post } from '../Core/POSTS.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private http: HttpClient) { }
  @Output() close = new EventEmitter<void>();
  @Output() Body = new EventEmitter<any>();
  @Output() NewEditePost !: String;
  @Output() ID !: number;
  Post !: Post;
  Add = true;
  Edit = true;
  @ViewChild('f', { static: true }) signupForm !: NgForm;
  ngOnInit(): void {
    if (this.ID != 0) {      
      this.http.get(`http://localhost:3000/feed/post/${this.ID}`, { observe: 'response' }).subscribe((data: any) => {
        if (data.body.post.id != null) {
          this.Post = data.body.post;
          this.filePath = this.Post.ImageUrl;
          this.signupForm.form.patchValue({
            Inputtitle: this.Post.title,
            Inputcontent: this.Post.content
          })
          this.Add = false
          this.Edit = true;
        }else{
          const message = {message : 'This ID is Not Exsit in DB'}
          this.Body.emit(message);
          this.Add = false;
          this.Edit = false;
        }
      })
    }else{
      this.Add = true;
      this.Edit = false;
    }
  }
  onClose() {
    this.close.emit();
  }
  image !: File;

  AddEditButton(signupForm: NgForm) {
    if(this.Add){
      const formData = new FormData();
      formData.append('file', this.image, this.image.name);
      formData.append('title', signupForm.form.value.Inputtitle);
      formData.append('content', signupForm.form.value.Inputcontent);
  
      this.http.post('http://localhost:3000/feed/post', formData, { observe: 'response' }).subscribe((data: any) => {
        if (data.status === 201) {
          signupForm.reset();
          this.Body.emit(data.body);
          this.onClose();
        }
      }, (error) => {
        console.log(error.error);
        this.Body.emit(error.error);
      })
    }else if(this.Edit){
    if(signupForm.form.value.Inputtitle.length > 4 &&signupForm.form.value.Inputcontent.length > 4){
      const httpParams = new HttpParams({
        fromObject: {
          id: this.ID
        }
      });
      const elementFile = <any><HTMLInputElement>document.getElementById('InputImage');
      const formData = new FormData();
      if (elementFile.files.length > 0) {        
        formData.append('file', this.image, this.image.name);
        formData.append('title', signupForm.form.value.Inputtitle);
        formData.append('content', signupForm.form.value.Inputcontent);
      }else{
        formData.append('title', signupForm.form.value.Inputtitle);
        formData.append('content', signupForm.form.value.Inputcontent);
      }
        this.http.put('http://localhost:3000/feed/post', formData , {params: httpParams, observe:'response'}).subscribe(data => {
          this.Body.emit(data.body);
          this.onClose();
        })
    }else{
      alert('Please Entre Valid Data');
    }
      
    }else{
      alert('No Action Please Select Correct Function')
    }
  }


  filePath !: string;

  selectImage(event: any) {
    //const file = console.log(event.target);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
}
