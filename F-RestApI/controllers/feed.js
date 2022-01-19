// var POST = [{
//   _id: "1",
//   title: 'First Post',
//   content: 'This is the first post!',
//   ImageUrl: 'http://localhost:3000/Images/3037.jpg',  
//   creator: {
//     name: "Mena"
//   },
//   CreatAt: new Date()
// }]

const POST = require('../models/feed');

exports.getPost = (req, res, next) => {
  POST.FetchAll(Posts => {
    const Len = Posts.length > 0 ? true : false
    res.status(200).json({
      message: Len ? 'Get All Post Successfull !!' : 'Connected! NO POST TO View',
      posts: Posts
    });
})
  
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const extentionFile = req.file.originalname.slice(req.file.originalname.lastIndexOf('.')+1);
  const FileName = req.file.filename + '.' + extentionFile;
  const FileUrl = req.file.path;
  new POST(title, content ,"http://localhost:3000/" + FileUrl, {name: "Mena"}, new Date()).save
  .then(result => {
    //console.log(result);
    res.status(201).json({
      message: 'Post created successfully! ' + result,
      post: { id: new Date().toISOString(), title: title, content: content },
    });
  })
  .catch(err => {
    console.log(err);
    });
  // Create post in db
  //console.log(req.file);  
};

exports.deletePOst = (req , res , next) => {
    const Id = req.params.id;
    //console.log(Id)
     POST.Delet(Id)
    .then(result => {
      //console.log(result);
      res.status(200).json({
        message: result
      })
    })
    .catch(err => {
      console.log('Event Occurred ' , err);
    });
}