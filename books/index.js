document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value;
  const url = `https://openlibrary.org/search.json?q=${searchTerm.replaceAll(
    " ",
    "+"
  )}`;

  const data = fetch(url)
    .then((response) => response.json())
    .then((data) => data);
});
