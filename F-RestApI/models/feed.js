const fs = require('fs');
const path = require('path');
const url = require('url');

const _dirname = path.dirname(process.mainModule.filename);

const p = path.join(_dirname, 'Data', 'Feed.json');

function isEmpityObjective(obj) {
    //Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
    return !Object.keys(obj).length;
}

const GetAllPostFromFile = tryanother => {
    fs.readFile(p, (err, Data) => {
        if (err || isEmpityObjective(Data)) {
            tryanother([]);
        } else {
            tryanother(JSON.parse(Data));
        }
    })
}

module.exports = class POST {
    constructor(title, content, ImageUrl, creator, CreatAt, id) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.ImageUrl = ImageUrl;
        this.creator = creator;
        this.CreatAt = CreatAt;
    }
    save = new Promise((res, rej) => {
        GetAllPostFromFile(Post => {
            if (this.id) {
                const POSTToUpdateIndex = Post.findIndex(post => post.id == this.id);
            Post[POSTToUpdateIndex] = { id: this.id, title: this.title, 
                    content: this.content, ImageUrl: this.ImageUrl, creator: this.creator, CreatAt: this.CreatAt };
            } else {
                this.id = Math.random().toString();
                let IdExsit;
                do {
                    IdExsit = Post.findIndex(post => post.id == this.id);
                } while (IdExsit !== -1)
                Post.push({ id: this.id, title: this.title, content: this.content, ImageUrl: this.ImageUrl, creator: this.creator, CreatAt: this.CreatAt });
            }
            //console.log(Post);
            fs.writeFile(p, JSON.stringify(Post), (err) => {
                if (!err) {
                    return res('this is Ok!')
                } else {
                    console.log(err);
                    return rej('Occured Event ', err);
                }
            })
        })
    })

    static FetchAll(Posts) {
        GetAllPostFromFile(Posts);
    }
    static Delet(Id) {
        return new Promise((res, rej) => {
            GetAllPostFromFile(Posts => {
                const postDelete = Posts.find(post => post.id === Id);
                const UpdatePost = Posts.filter(post => post.id !== Id);

                const ImageName = new URL(postDelete.ImageUrl).pathname;
                const ImageUrl = path.join(_dirname, ImageName);
                //console.log(ImageUrl);

                fs.unlink(ImageUrl, (err) => {
                    if (err) {
                        return rej('In Delete File ' + err);
                    }
                });

                fs.writeFile(p, JSON.stringify(UpdatePost), (err) => {
                    if (!err) {
                        return res('the Deleted Item is Done !');
                    } else {
                        return rej('In Update File JSON ' + err);
                    }
                })
            })
        })
    }

    static findByID(id, done) {
        let POst;
        GetAllPostFromFile(Posts => {
            const getPOst = Posts.find(post => post.id === id);
            if (getPOst != undefined) {
                POst = getPOst;
            } else {
                POst = { id: null, title: null, content: null, ImageUrl: null, creator: null, CreatAt: null }
            }
            done(POst);
        })
    }
}
