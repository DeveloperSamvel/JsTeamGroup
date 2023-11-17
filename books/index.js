document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value;
  const url = `https://openlibrary.org/search.json?q=${searchTerm.replaceAll(
    " ",
    "+"
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => generateNeededView(data));
});

function generateNeededView(data) {
  const resultsContainer = document.getElementById("results");
  const totalCountOfResults = data.numFound;
  const resultsData = data.docs;

  resultsContainer.innerHTML = "";

  const totalCountElement = document.createElement("p");
  totalCountElement.innerHTML = `Total count of your search result is: ${totalCountOfResults}`;
  resultsContainer.appendChild(totalCountElement);

  for (let i = 0; i < resultsData.length; i++) {
    const resultDiv = document.createElement("div");

    const bookData = resultsData[i];
    const title = `Title: ${bookData.title}`;
    const authorName = `Author name: ${bookData.author_name}`;
    const firstPublishYear = `First publish year: ${bookData.first_publish_year}`;
    const subjectItems = `Subject: ${bookData.subject.slice(0, 5).join(", ")}`;

    const titleElement = document.createElement("h4");
    titleElement.innerHTML = title;
    resultDiv.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.innerHTML = authorName;
    resultDiv.appendChild(authorElement);

    const firstPublishYearElement = document.createElement("p");
    firstPublishYearElement.innerHTML = firstPublishYear;
    resultDiv.appendChild(firstPublishYearElement);

    const subjectsElement = document.createElement("p");
    subjectsElement.innerHTML = subjectItems;
    resultDiv.appendChild(subjectsElement);

    resultsContainer.appendChild(resultDiv);
  }
}
