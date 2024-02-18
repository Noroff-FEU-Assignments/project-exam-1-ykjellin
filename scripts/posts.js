document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://www.kjellinfrontend.com/wp-json/wp/v2/posts?_embed&per_page=20";

  function fetchPosts() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((posts) => {
        displayPosts(posts);
        displayLatestPosts(posts.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  function displayPosts(posts) {
    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) {
      console.error("Posts container element not found");
      return;
    }

    postsContainer.innerHTML = "";

    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.className = "post";

      let postHtml = `<h2>${post.title.rendered}</h2>`;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.content.rendered;
      const firstImage = tempDiv.querySelector("img");
      if (firstImage) {
        const imageSrc = firstImage.getAttribute("data-opt-src")
          ? firstImage.getAttribute("data-opt-src")
          : firstImage.src;
        postHtml += `<img src="${imageSrc}" alt="${post.title.rendered}" class="thumbnail" style="margin-right:10px; float:left;">`;
      }

      let contentExcerpt = tempDiv.textContent.slice(0, 150) + "...";
      postHtml += `<div class="contentExcerpt">${contentExcerpt}</div>`;
      postHtml += `<a href="post.html?post_id=${post.id}" class="read-more">Read More</a>`;

      postElement.innerHTML = postHtml;
      postsContainer.appendChild(postElement);
    });
  }

  function displayLatestPosts(latestPosts) {
    const latestPostsList = document.querySelector(".carouselUl");
    if (!latestPostsList) {
      console.error("Latest posts list container not found");
      return;
    }

    latestPostsList.innerHTML = "";

    latestPosts.forEach((post, index) => {
      const postItem = document.createElement("li");

      let postHtml = `<h2>${post.title.rendered}</h2>`;

      postItem.innerHTML = `<h2>${post.title.rendered}</h2>`;

      if (
        post._embedded &&
        post._embedded["wp:featuredmedia"] &&
        post._embedded["wp:featuredmedia"][0] &&
        post._embedded["wp:featuredmedia"][0].source_url
      ) {
        const imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
        postHtml += `<a href="post.html?post_id=${post.id}" target="_blank">
                <img src="${imageUrl}" alt="${post.title.rendered}" style="width:100px; height:auto;">
            </a>`;
      } else {
        console.log("No image found for post ${post.id}");
      }

      if (index === 0) {
        postItem.setAttribute("data-active", "true");
      }

      postHtml += `<a href="post.html?post_id=${post.id}" target="_blank">Read More</a>`;
      postItem.innerHTML = postHtml;
      latestPostsList.appendChild(postItem);
    });
  }

  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });

  fetchPosts();
});
