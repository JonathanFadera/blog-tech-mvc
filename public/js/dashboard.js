var existingBlogs = document.querySelector("#existingblogs");
var createNew = document.querySelector("#createNew");
var newPost = document.querySelector("#newPost");
var newBlog = document.querySelector("#newBlog");

function hideCreateNew() {
    createNew.hidden = true;
}

hideCreateNew();

newPost.addEventListener("submit", event => {
    event.preventDefault();
    console.log("click");
    existingBlogs.hidden = false;
    newPost.hidden = true;
    createNew.hidden = false;
});

newBlog.addEventListener("submit", event => {
    var title = document.querySelector("#title").value;
    var content = document.querySelector("#content").value;
    event.preventDefault();
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
    }).then(res => {
        if (res.ok) {
            createNew.removeAttribute("hidden");
            location.reload();
        } else {
            alert("Something went wrong");
        }
    });
});
