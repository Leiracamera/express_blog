The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. The application will allow users to create and view blog posts. Posts will not persist between sessions as no database will be used in this version of the application. Styling will be an important aspect of this project to ensure a good user experience.

Pages
1. Home Page - Links to Create Blog, View Blogs, Manage Blogs?
2. Create Blog (form with inputs for name, date and text)
3. View Blogs (Page where blogs are published and can be clicked to view?)


LOG

- Created Repo: 
    - public/styles/styles.css
    - views
        - index.ejs
        - create-post.ejs
        - view-blogs.ejs
        - blogs.ejs
        - /partials/
            - footer.ejs
            - header.ejs
    - index.js (home-page)

    - README.md
- npm init -y (created package.json) 
- npm i express, ejs & body-parser packages (node_modules)


What is currently working: 
- Menu links to 
     - My Blog = home page
     - Home = home page
     - /create-post takes user to a form, to create a blog post. When pressed submit, the post is saved to the server 
     - Once they press submit it redirects to /blogs/[index of blog post (1, 2, 3 etc)]
     - blogs by itself goes to a page that has a list of all the blogs 
     - links on blogs main page link to individual blogs at their own url (using post id)

- TODO
    - Edit page needs to allow data to be updated. 
    - Create styling in CSS 
    