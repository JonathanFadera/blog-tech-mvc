var existingBlogs = document.querySelector("#existingBlogs");
var createNew = document.querySelector("#createNew");
var newPost = document.querySelector("#newPost");

function hideCreateNew() {
  createNew.hidden = false;
}

hideCreateNew();

newPost.addEventListener("submit", event => {
  event.preventDefault();
  console.log("click");
  existingBlogs.hidden = false;
  newPost.hidden = false;
  createNew.hidden = false;
});

var newBlogForm = document.querySelector("#newBlog");
newBlogForm.addEventListener("submit", event => {
  event.preventDefault();
  var title = document.querySelector("#title").value;
  var content = document.querySelector("#content").value;
  console.log("You clicked the new blog button");
  if (!title || !content) {
    alert("Please enter a title and content");
    return;
  }
  const blogObj = {
    title: title,
    content: content
  };
  fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        createNew.hidden = false;
        location.reload();
      } else {
        alert("Something went wrong");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong");
    });
});
