const apiKey = "TrAOaNFEuh7CtaF1xbqatu4L7Je9VPjuwlGWdEZ9oVbfDaoCpyldLRZd";
const searchForm = document.getElementById("searchForm");
const photosGrid = document.querySelector("#photosGrid");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let queryText = document.getElementById("searchInput").value;
  try {
    checkFirstChar(queryText[0]);
    if (queryText != "") {
      photosGrid.innerHTML = "";
      fetchPhotos(`https://api.pexels.com/v1/search?query=${queryText}`);
    }
  } catch (e) {
    console.log(e.message);
  }
});

function checkFirstChar(char) {
  if (["#", "%", "&", "+"].some((el) => el === char)) {
    photosGrid.innerHTML = `You cannot start your query with special characters, like # or %`;
    throw new Error("Incorrect query!");
  }
}

function handleIcons(photos) {
  photos.map((photo) => {
    const photoCard = `<div title="${photo.alt}" class="photoCard"><a href="#" onclick="showPhoto(${photo.id})"><img src="${photo.src.tiny}" /></a></div>`;
    photosGrid.innerHTML += photoCard;
  });
}

async function fetchPhotos(url) {
  try {
    fetch(url, {
      headers: {
        Authorization: `${apiKey}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleIcons(data.photos);
      });
  } catch (e) {
    photosGrid.innerHTML = `An error occurred. Please change the query phrase or try again later.`;
    console.log(`${e.name} : ${e.message}`);
  }
}

async function showPhoto(id) {
  let photo = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: `${apiKey}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  const showPhoto = window.open("", "_blank");

  showPhoto.document.write(`
    <html>
      <head>
        <link rel="stylesheet" href="style.css" />
        <title>Show Photo</title>
      </head>
      <body>
      <content id="content">
        <div id="photoShow"><img src="${photo.src.original}" alt="${photo.alt}" class="fullImage" /></div>
        <div id="photoDetails">
          <div>Photographer: <a href="${photo.photographer_url}">${photo.photographer}</a></div>
          <div>Description: ${photo.alt}</div>
          <div>Size: ${photo.width} x ${photo.height} pixels</div>
        </div>
      </content>
      </body>
    </html>
  `);
}

// get curated photos on page loading
fetchPhotos(`https://api.pexels.com/v1/curated?page=1&per_page=15`);
