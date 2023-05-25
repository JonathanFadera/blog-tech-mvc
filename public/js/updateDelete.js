document.querySelector("#update").addEventListener("submit", event => {
    event.preventDefault();
    const blogId = document.querySelector("#hiddenBlogId").value;
    const editBlog = {
        title: document.querySelector("#editedTitle").value,
        content: document.querySelector("#editedContent").value,
    };
    console.log(editBlog);
    console.log(blogId);
    fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(editBlog),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            console.log("Blog updated");
            location.href = "/dashboard";
        } else {
            alert("Error updating blog");
        }
    });
});

// delete blog
document.querySelector("#delete").addEventListener("click", event => {
    event.preventDefault();
    const blogId = document.querySelector("#hiddenBlogId").value;
    fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
    }).then(res => {
        if (res.ok) {
            console.log("Blog deleted");
            location.href = "/dashboard";
        } else {
            alert("Error deleting blog");
        }
    });
});