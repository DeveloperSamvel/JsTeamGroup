const apiKey = "TrAOaNFEuh7CtaF1xbqatu4L7Je9VPjuwlGWdEZ9oVbfDaoCpyldLRZd";
const searchForm = document.getElementById("searchForm");
const photosGrid = document.querySelector("#photosGrid");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let queryText = document.getElementById("searchInput").value;
  if (queryText[0] === "#") {
    photosGrid.innerHTML = `You cannot start your query with #`;
  } else if (queryText != "") {
    photosGrid.innerHTML = "";
    try {
      fetchPhotos(`https://api.pexels.com/v1/search?query=${queryText}`);
    } catch (e) {
      photosGrid.innerHTML = `An error occurred. Please change the query phrase or try again later.`;
      console.error(e.message);
    }
  }
});

function handleImages(photos) {
  photos.map((photo) => {
    const photoCard = `<div title="${photo.alt}" class="photoCard"><a href="${photo.src.original}"><img src="${photo.src.tiny}" /></a></div>`;
    photosGrid.innerHTML += photoCard;
  });
}

async function fetchPhotos(url) {
  fetch(url, {
    headers: {
      Authorization: `${apiKey}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      handleImages(data.photos);
    });
}

// get curated photos on page loading
fetchPhotos(`https://api.pexels.com/v1/curated?page=1&per_page=15`);
