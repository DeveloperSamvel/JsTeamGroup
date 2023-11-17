const apiKey = "TrAOaNFEuh7CtaF1xbqatu4L7Je9VPjuwlGWdEZ9oVbfDaoCpyldLRZd";
const searchForm = document.getElementById("searchForm");
const photosGrid = document.querySelector("#photosGrid");
const rootUrl = encodeURI("http://lav.x10.bz");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const queryText = document.getElementById("searchInput").value;
  try {
    checkFirstChar(queryText[0]);
    if (queryText != "") {
      photosGrid.innerHTML = "";
      fetchPhotos(
        encodeURI(`https://api.pexels.com/v1/search?query=${queryText}`)
      );
    }
  } catch (e) {
    console.log(e.message);
  }
});

function checkFirstChar(firstChar) {
  if (["#", "%", "&", "+"].some((el) => el === firstChar)) {
    photosGrid.innerHTML = `You cannot start your query with special characters, like #, %, &, or +.`;
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
        console.log(response);
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
  const photo = await fetch(
    encodeURI(`https://api.pexels.com/v1/photos/${id}`),
    {
      headers: {
        Authorization: `${apiKey}`,
      },
    }
  )
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
        <link rel="stylesheet" href="style.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="${rootUrl}/img/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${rootUrl}/img/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${rootUrl}/img/favicon-16x16.png">
        <link rel="manifest" href="${rootUrl}/img/site.webmanifest">
        <link rel="mask-icon" href="${rootUrl}/img/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
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
fetchPhotos(encodeURI(`https://api.pexels.com/v1/curated?page=1&per_page=15`));
