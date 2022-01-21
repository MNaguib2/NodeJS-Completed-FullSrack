import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private http: HttpClient) { }
  @Output() close = new EventEmitter<void>();
  @Output() Body = new EventEmitter<void>();

  ngOnInit(): void {
  }
  onClose() {
    this.close.emit();
  }
  image !: File;
  AddPost(signupForm: NgForm) {
    //  console.log(signupForm.form.value.Inputtitle);
    //  console.log(signupForm);
    const formData = new FormData();
    formData.append('file', this.image, this.image.name);
    formData.append('title', signupForm.form.value.Inputtitle);
    formData.append('content', signupForm.form.value.Inputcontent);
    //console.log(formData);

    this.http.post('http://localhost:3000/feed/post', formData, { observe: 'response' }).subscribe((data: any) => {
      if (data.status === 201) {
        signupForm.reset();
        this.Body.emit(data.body);
        this.onClose();
      }
    })
  }
  filePath !: string;
  selectImage(event: any) {
    //const file = (event.target as HTMLInputElement).files[0];
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
