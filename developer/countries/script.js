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
      detailsWindow.document.write(`
          <html>
            <head>
              <title>${selectedCountry.name.common} Details</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                }
                h2 {
                  color: #333;
                }
                p {
                  margin: 5px 0;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <h2>${selectedCountry.name.common}</h2>
              <img src="${selectedCountry.flags.png}" alt="${
        selectedCountry.name.common
      } Flag">
              <p>Region: ${selectedCountry.region}</p>
              <p>Capital: ${selectedCountry.capital}</p>
              <p>Population: ${selectedCountry.population}</p>
              <p>Language: ${
                selectedCountry.languages[
                  Object.keys(selectedCountry.languages)[0]
                ]
              }</p>
              <p>Code: ${selectedCountry.cca2}</p>
            </body>
          </html>
        `);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

displayCountries();
