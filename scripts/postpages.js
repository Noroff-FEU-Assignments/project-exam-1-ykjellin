document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const postId = queryParams.get("post_id");

  if (postId) {
    const apiUrl = `https://www.kjellinfrontend.com/wp-json/wp/v2/posts/${postId}?_embed`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((post) => {
        displayPost(post);

        document.title = `Ai-Blog | ${post.title.rendered}`;
      })
      .catch((error) => console.error("Error fetching post:", error));
  } else {
    console.error("Post ID not specified in the query string");
  }
});

function displayPost(post) {
  const postContent = document.getElementById("post-content");

  postContent.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = post.title.rendered;

  const image = document.createElement("img");

  if (
    post._embedded &&
    post._embedded["wp:featuredmedia"] &&
    post._embedded["wp:featuredmedia"][0]
  ) {
    image.src = post._embedded["wp:featuredmedia"][0].source_url;
    image.alt = post.title.rendered;
  }

  const content = document.createElement("div");
  content.innerHTML = post.content.rendered;

  postContent.appendChild(title);
  if (post._embedded["wp:featuredmedia"]) {
    postContent.appendChild(image);
  }
  postContent.appendChild(content);
}
