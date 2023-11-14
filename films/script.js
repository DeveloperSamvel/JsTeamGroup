let queryText = "landscape";
const searchForm = document.getElementById("searchForm");
const photosGrid = document.querySelector("#photosGrid");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputText = document.getElementById("searchInput").value;

  if (inputText != "") {
    queryText = inputText;
    photosGrid.innerHTML = "";

    fetch(`https://api.pexels.com/v1/search?query=${queryText}`, {
      headers: {
        Authorization:
          "TrAOaNFEuh7CtaF1xbqatu4L7Je9VPjuwlGWdEZ9oVbfDaoCpyldLRZd",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleImages(data.photos);
      });
  }
});

function handleImages(photos) {
  photos.map((photo) => {
    const photoCard = `<div title="${photo.alt}" class="photoCard"><a href="${photo.src.original}"><img src="${photo.src.tiny}" /></a></div>`;
    photosGrid.innerHTML += photoCard;
  });
}

fetch(`https://api.pexels.com/v1/curated?page=2&per_page=40`, {
  headers: {
    Authorization: "TrAOaNFEuh7CtaF1xbqatu4L7Je9VPjuwlGWdEZ9oVbfDaoCpyldLRZd",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    handleImages(data.photos);
  });
