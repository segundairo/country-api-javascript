const api = new API();
const ui = new UI();
const currentDoc = window.location.pathname

const init = () => {
  api
    .getAllCountries()
    .then((countries) => {
      if (countries) {
        ui.showAllCountries(countries.countries);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const searchQuery = (searchUrl) => {
  api
    .getSelectedCountries(searchUrl)
    .then((countries) => {
      if (countries) {
        ui.showAllCountries(countries.countries);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const detailCountry = (code) => {
  api
    .getCountryDetail(code)
    .then((country) => {
      if (country) {
        ui.showCountry(country.country);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchCountry = (searchText, type) => {
   if (searchText === "") {     
      init();
  } else {
    let searchUrl = " ";
    if (type === "name") {
      searchUrl = `name/${searchText}`;
    } else {
      searchUrl = `region/${searchText}`;
     }
     searchQuery(searchUrl); 
  }
};

if (currentDoc.includes('index.html')) {
   window.addEventListener('DOMContentLoaded', init)
} else {
   const code = window.location.search.split('=')[1]
   detailCountry(code)
}


