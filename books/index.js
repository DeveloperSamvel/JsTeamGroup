document.getElementById("searchButton").addEventListener("click", searchBooks);

function searchBooks() {
  const searchTerm = document.getElementById("searchInput").value;

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = '<p class="loading-message">Loading...</p>';

  const url = `https://openlibrary.org/search.json?q=${searchTerm.replaceAll(
    " ",
    "+"
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = "";
      generateNeededView(data);
    })
    .catch((error) => {
      resultsContainer.innerHTML =
        '<p class="error-message">An error occurred. Please try again.</p>';
      console.error("Error fetching data:", error);
    });
}

function generateNeededView(data) {
  const resultsContainer = document.getElementById("results");
  const totalCountOfResults = data.numFound;
  const resultsData = data.docs;
  const pageCount = Math.ceil(totalCountOfResults / 100);

  resultsContainer.innerHTML = "";

  const resultCountElement = document.getElementById("result-count");
  if (resultCountElement) {
    resultCountElement.innerHTML = "";
  }
  const totalCountElement = document.createElement("p");
  totalCountElement.classList.add("search-result-count");
  totalCountElement.innerHTML = `Total count of your search result is: ${totalCountOfResults}`;
  resultCountElement.append(totalCountElement);

  generatePaginationButtons(pageCount);

  for (let i = 0; i < resultsData.length; i++) {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("book-result");

    const bookData = resultsData[i];

    const title = `Title: ${bookData.title}`;
    const authorName = `Author name: ${bookData.author_name}`;
    const firstPublishYear = `First publish year: ${bookData.first_publish_year}`;
    const subData = bookData?.subject?.slice(0, 5).join(", ") || 'without subject';
    const subjectItems = `Subject: ${subData}`;

    const titleElement = document.createElement("h4");
    titleElement.classList.add("book-title");
    titleElement.innerHTML = title;
    resultDiv.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.classList.add("book-author");
    authorElement.innerHTML = authorName;
    resultDiv.appendChild(authorElement);

    const firstPublishYearElement = document.createElement("p");
    firstPublishYearElement.classList.add("book-publish-year");
    firstPublishYearElement.innerHTML = firstPublishYear;
    resultDiv.appendChild(firstPublishYearElement);

    const subjectsElement = document.createElement("p");
    subjectsElement.classList.add("book-subjects");
    subjectsElement.innerHTML = subjectItems;
    resultDiv.appendChild(subjectsElement);

    const coverImg = document.createElement("img");
    coverImg.classList.add("book-cover");
    coverImg.src = `https://covers.openlibrary.org/b/id/${bookData?.cover_i}-L.jpg`;
    coverImg.alt = "Book Cover";
    resultDiv.appendChild(coverImg);

    resultsContainer.appendChild(resultDiv);
  }
}

let startingValue = 1;
let endValue = 10;
let totalPages = 0;

function generatePaginationButtons(pageCount) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  totalPages = Math.ceil(pageCount / 10);

  for (let i = startingValue; i <= endValue && i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerHTML = i;
    pageButton.addEventListener("click", () => goToPage(i));
    paginationContainer.appendChild(pageButton);
  }

  if (endValue < totalPages) {
    const moreButton = document.createElement("button");
    moreButton.innerHTML = "More";
    moreButton.addEventListener("click", showMorePages);
    paginationContainer.appendChild(moreButton);
  }
}

function showMorePages() {
  startingValue = endValue + 1;
  endValue = startingValue + 9;

  if (endValue > totalPages) {
    endValue = totalPages;
  }

  generatePaginationButtons(totalPages);
}

function goToPage(pageNumber) {
  const searchTerm = document.getElementById("searchInput").value;
  const url = `https://openlibrary.org/search.json?q=${searchTerm.replaceAll(
    " ",
    "+"
  )}&page=${pageNumber}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => generateNeededView(data));
}
