document.querySelector("#newComment").addEventListener("submit", event => {
    event.preventDefault();
    const comment = document.querySelector("#comment").value;
    const blogId = document.querySelector("#hiddenCommentId").value;

    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ comment, blogId }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            console.log("Comment was created successfully");
            location.reload();
        } else {
            alert("Something went wrong");
        }
    }).catch(err => {
        console.error(err);
        alert("An error occurred");
    });
});
