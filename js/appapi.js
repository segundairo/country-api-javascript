class API {
  constructor() {
    this.base = "https://restcountries.eu/rest/v2/";
  }
  async getAllCountries() {
    try {
      const response = await fetch(`${this.base}all`);
      const ui = new UI();
      if (response.ok) {
        const result = await response.json();
        const countries = result.map((country) => {
          return {
            name: country.name,
            population: country.population,
            region: country.region,
            capital: country.capital,
            code: country.alpha3Code,
            flag: country.flag,
          };
        });
        ui.resetInput();
        return { countries };
      } else {
        console.log("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getSelectedCountries(url) {
    try {
      const response = await fetch(`${this.base}${url}`);

      if (response.ok) {
        const result = await response.json();
        const countries = result.map((country) => {
          return {
            name: country.name,
            population: country.population,
            region: country.region,
            capital: country.capital,
            code: country.alpha3Code,
            flag: country.flag,
          };
        });
        return { countries };
      } else {
        if (response.status === 404) {
          console.log(response.status);
        } else {
          console.log("Not found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getCountryDetail(code) {
    try {
      const response = await fetch(`${this.base}alpha/${code}`);
      if (response.ok) {
        const result = await response.json();
        const borders = result.borders;
         let borderNations = [];
         
        if (borders.length > 0) {
          let borderQuery = borders.join(";");
          const borderCountries = await fetch(
            `${this.base}alpha?codes=${borderQuery}`
          );
          const borderResult = await borderCountries.json();
          borderNations = borderResult.map((border) => {
            return { name: border.name, code: border.alpha3Code };
          });
        }

        const country = {
          name: result.name,
          population: result.population,
          region: result.region,
          capital: result.capital,
          code: result.alpha3Code,
          flag: result.flag,
           borders: borderNations,
           subregion: result.subregion,
           tld: result.topLevelDomain,
           currencies: result.currencies,
           languages: result.languages,
          nativeName: result.nativeName
         };
         console.log(country);
         
        return { country };
      } else {
        console.log("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
