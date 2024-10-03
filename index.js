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
    if (blogPosts.length > 0) {
        const latestPost = blogPosts[blogPosts.length - 1];
    res.render("index.ejs", {latestPost, blogPosts});
    } else {
        res.render("index.ejs", {latestPost: null, blogPosts: []});
    }
  
});

// Render Create Post page
app.get("/create-post", (req, res) => {
    res.render("create-post.ejs")
  });

 // Handle form submission from Create Post 
app.post("/create-post", (req, res) => {
    const { blogTitle, authorName, blogContent} = req.body;
    const currentDateTime = new Date().toLocaleString(); 

    const newPost = {
        title: blogTitle,
        author: authorName,
        content: blogContent,
        date: currentDateTime
    };

    blogPosts.push(newPost);
    console.log(newPost);

    const newPostId = blogPosts.length - 1;
    console.log(newPostId);

    res.redirect(`/view-posts/${newPostId}`);
});

// Render the blogs page and pass blogPosts
app.get("/view-posts", (req, res) => {
    res.render("view-posts.ejs", {posts: blogPosts});
});

app.get("/view-posts/:id", (req, res) => {
    const blogId = req.params.id;
    const post = blogPosts[blogId];

    if (post) {
        res.render("blog.ejs", { post, blogId });
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/view-posts/:id/delete", (req, res) => {
    const blogId = req.params.id;
    if (blogPosts[blogId, 1]) {
        blogPosts.splice(blogId, 1);
        res.redirect("/view-posts");
    } else {
        res.redirect("/");
    }   
});

app.get("/view-posts/:id/edit", (req, res) => {
    const blogId = req.params.id;
    const post = blogPosts[blogId];

    if (post) {
        res.locals.post = post;
        res.locals.blogId = blogId;
        res.render("edit.ejs");
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/view-posts/:id", (req, res) => {
    const blogId = req.params.id;
    const { blogTitle, authorName, blogContent } = req.body;
    const editedDateTime = new Date().toLocaleString();

    console.log("Before update:", blogPosts); // Check the array before the update

    // Update each field directly
    blogPosts[blogId].title = blogTitle;
    blogPosts[blogId].author = authorName;
    blogPosts[blogId].content = blogContent;
    blogPosts[blogId].editedDateTime = editedDateTime;

    console.log("After update:", blogPosts); // Check the array after the update
    res.redirect(`/view-posts/${blogId}`);
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });