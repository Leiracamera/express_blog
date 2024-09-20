import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [];

// Home page route
app.get("/", (req, res) => {
  res.render("index.ejs")
});

// Render Create Post page
app.get("/create-post", (req, res) => {
    res.render("create-post.ejs")
  });

 // Handle form submission from Create Post 
app.post("/create-post", (req, res) => {
    const { blogTitle, authorName, blogContent} = req.body;
    const currentDate = new Date().toLocaleDateString(); 

    const newPost = {
        title: blogTitle,
        author: authorName,
        content: blogContent,
        date: currentDate
    };

    blogPosts.push(newPost);
    console.log(newPost);

    const newPostId = blogPosts.length - 1;
    console.log(newPostId);

    res.redirect(`/blogs/${newPostId}`);
});

// Render the blogs page and pass blogPosts
app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", {posts: blogPosts});
});

app.get("/blogs/:id", (req, res) => {
    const blogId = req.params.id;
    const post = blogPosts[blogId];

    if (post) {
        res.render("blog.ejs", { post, blogId });
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/blogs/:id/delete", (req, res) => {
    const blogId = req.params.id;
    if (blogPosts[blogId, 1]) {
        blogPosts.splice(blogId, 1);
        res.redirect("/blogs");
    } else {
        res.status(404).send("Post not found");
    }   
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });