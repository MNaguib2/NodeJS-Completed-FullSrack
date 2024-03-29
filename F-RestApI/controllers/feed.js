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
const { validationResult }  = require('express-validator/check'); 
const fs = require('fs');
const POST = require('../models/feed');
const url = require('url');


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
  const error = validationResult(req);
  const FileUrl = req.file.path;
  if(!error.isEmpty()){
    // this is another code but not use to this requirment middelware in express to handle error
    // const error = new Error('validation faild, entred data is incorrect.');
    // error.statusCode = 422;
    // throw error;    
    fs.unlink(FileUrl , (err) => {
      if (err) {
          return new Error('Not Delete file');
      }
  });

    return res.status(422).json({ //this is comment to will try another code Above
      message: "validation faild, entred data is incorrect.",
      errors: error.array()
    })
  }
  const title = req.body.title;
  const content = req.body.content;
  const extentionFile = req.file.originalname.slice(req.file.originalname.lastIndexOf('.')+1);
  const FileName = req.file.filename + '.' + extentionFile;
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

exports.getPOstByID = (req, res, next) => {
  const id = req.params.id;
  //console.log(id);
  POST.findByID(id , Post => {
    res.status(201).json({
      message: 'Get Post By ID Successful!',
      post: Post,
    })
  }) 
}
exports.PutEditPost = (req, res, next) => {
  const Id = req.query.id;
  let FileUrl;
  POST.findByID(Id, Post => {
    if(req.file){
      const backPath = url.parse(Post.ImageUrl).pathname;
      fs.unlink('.'+backPath , (err) => {
        if(err){
          return new Error('Not Delete file'); 
        }
      })
       FileUrl = "http://localhost:3000/" + req.file.path; 
    }else{
      FileUrl = Post.ImageUrl;
    }
    new POST(req.body.title , req.body.content, FileUrl,Post.creator, Post.CreatAt, Id).save
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Post Edit successfully! '
      });
    }).catch(err => {

    })
  })
}

exports.test =(req, res, next) => {
  console.log(req.body);
  res.end();
}