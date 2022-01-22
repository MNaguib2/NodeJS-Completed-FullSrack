export class Post {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public ImageUrl: string,
        public creator : Array<Object>,
        public CreatAt : Date
        ){}
  }
  