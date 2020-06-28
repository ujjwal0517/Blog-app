const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blogs = require("./models/blog");
 app.set("view engine", "ejs");
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));
const DATABASE_URI = "mongodb://localhost/blogsDB";

mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", ()=> console.log("database connected succesfully"));
 
app.get("/", async(req, res)=>{
    const blogs = await Blogs.find();
    res.render("index", {blogs: blogs});
})
 app.post("/create", (req, res)=>{
     const newBlog = new Blogs({
         title: req.body.title,
         content: req.body.content,
     });
     newBlog.save();
     res.redirect('/');
 });
 app.get("/create", (req,res)=>{
     res.render("create");
 })
 app.get("/readmore/:title", async(req,res)=>{
     await Blogs.findOne({title: req.params.title}, (err, result)=>{
         if(err){
             console.log(err);
         }else if(result){
             res.render("readmore", {blog: result})
         }
     })
 })
 app.get("/delete/:title", async(req, res)=>{
     await Blogs.findOne({title: req.params.title}, (err, result)=>{
         if(err){
             console.log(err);
         }else if(result){
             result.remove();
             res.redirect("/");
         }
     })
 })
 app.get("/edit/:title", async (req,res)=>{
     await Blogs.findOne({title: req.params.title}, (err, result)=>{
         if(err){
             console.log(err);
         }
         else if(result){
             res.render("update", {blog: result});
         }
     })

 })
 app.post("/update/:id", async (req,res)=>{
    await Blogs.findById(req.params.id, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result) {
          result.title = req.body.title;
          result.content = req.body.content;
          result.save();
          res.redirect("/");
        }
      });
    });
    app.listen(3000, () => console.log("Running @ 3000"));
 