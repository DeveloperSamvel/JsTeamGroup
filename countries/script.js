let apiUrl = "https://restcountries.com/v3.1/all";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function displayCountries() {
  const countriesList = document.getElementById("countries-list");
  const countries = await fetchData(apiUrl);

  console.log(countries);
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `
      <h3>${country.name.common}</h3>
      <img class="country-flag" src="${country.flags.png}" alt="${country.name.common} Flag">
      <button class="more-button" onclick="openCountryDetails('${country.name.common}')">More</button>
    `;
    countriesList.appendChild(countryCard);
  });
}

function filterCountries() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const countryCards = document.querySelectorAll(".country-card");

  countryCards.forEach((card) => {
    const countryName = card.querySelector("h3").innerText.toLowerCase();
    if (countryName.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

async function openCountryDetails(countryName) {
  try {
    const countries = await fetchData(apiUrl);
    const selectedCountry = countries.find(
      (country) => country.name.common === countryName
    );

    if (selectedCountry) {
      const detailsWindow = window.open("", "_blank");

      detailsWindow.document.write("<html><head></head><body></body></html>");

      detailsWindow.document.head.innerHTML = `
        <title>${selectedCountry.name.common} Details</title>
        <link rel="stylesheet" href="styles.css">
      `;

      const detailsContainer = detailsWindow.document.createElement("div");
      detailsContainer.className = "details-container";
      detailsContainer.innerHTML = `
  <h2>${selectedCountry.name.common}</h2>
  <img class="country-flag" src="${selectedCountry.flags.png}" alt="${
        selectedCountry.name.common
      } Flag">
      <p>Region: ${selectedCountry.region}</p>
  <p>Capital: ${selectedCountry.capital}</p>
  <p>Population: ${selectedCountry.population}</p>
  <p>Language: ${
    selectedCountry.languages[Object.keys(selectedCountry.languages)[0]]
  }</p>
  <p>Code: ${selectedCountry.cca2}</p>
  <p>Area: ${selectedCountry.area} sq km</p>
  <p>Currencies: ${
    selectedCountry.currencies
      ? Object.values(selectedCountry.currencies)
          .map((currency) => `${currency.name} (${currency.symbol})`)
          .join(", ")
      : "N/A"
  }</p>
  <p>Subregion: ${selectedCountry.subregion}</p>
  <button class="close-button" onclick="window.close()">Close</button>
`;

      detailsWindow.document.body.appendChild(detailsContainer);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

displayCountries();
