class UI {
  constructor() {
    this.intFormat = new Intl.NumberFormat("en-US");
    this.uiCountries = document.getElementById("countries");
    this.textInput = document.getElementById("search");
     this.regionSelect = document.getElementById("region");
     this.country = document.getElementById('country-detail')
  }
  showAllCountries(countries) {
    let output = "";
    countries.forEach((country) => {
      output += `
         <div class="country" id="country" >
         <div class="country__flag">
            <img src="${country.flag}" alt="${country.name}">            
         </div>
         <div class="country__details">
            <h2 class="country__name"   >
               <a class="search-country"  data-id="${country.code}" href="./country.html?code=${
        country.code
      }">${country.name}</a>  
            </h2>
          
            <ul>
               <li><span>Population:  </span>${this.intFormat.format(
                 country.population
               )}</li>
               <li><span>Region:  </span>${country.region}</li>
               <li><span>Capital:  </span>${country.capital}</li>
            </ul>
         </div>
      </div>
         `;
    });
    this.uiCountries.innerHTML = output;
    this.initCountries();
  }

  showCountry(country) {
    let output = `
    <div class="country__flag"><img src="${country.flag}"></div>

    <div class="country__detail">
       <h1>${country.name}</h1>
       <div>
          <ul>
             <li><span>Native Name: </span>${country.name}</li>
             <li><span>Population: </span>${this.intFormat.format(country.population)}</li>
             <li><span>Region: </span>${country.region}</li>
             <li><span>Sub Region: </span>${country.subregion}</li>
             <li><span>Capital: </span>${country.capital}</li>
          </ul>
          <ul>
             <li><span>Top Level Domain: </span>${this.showTLDs(country.tld)}</li>
             <li><span>Currency: </span>${this.showCurrencies(country.currencies)}</li>
             <li><span>Language: </span>${this.showLanguages(country.languages)}</li>
          </ul>

       </div>
       <div id="border">
          <span>Border Countries:</span>
         
            ${this.showBorders(country.borders)}
         

       </div>
    </div>
      `;
    this.country.innerHTML = output;
  }

  resetInput() {
    this.textInput.value = "";
    this.regionSelect.value = "";
   }
   
   showCurrencies(currencies) {
      const allCurrencies = currencies.map(currency => {
         return currency.name
      })
      return allCurrencies.join(', ')
   }
   showLanguages(languages) {
      const allLanguages = languages.map(language => {
         return language.name
      })
      return allLanguages.join(', ')
   }
   showTLDs(TLDs) {
      const allTLDs = TLDs.map(tld => {
         return tld
      })
      return allTLDs.join(', ')
   }

   showBorders(borders) {
      const allBorders = borders.map(border => {
         return `<li><a href="./country.html?code=${border.code}" class="borders">${border.name}</a></li>`   
      })
      return allBorders.join('')
   }

  initCountries() {
    const anchors = document.querySelectorAll(".search-country");
    const search = document.getElementById("search");
     const region = document.getElementById("region");
     
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
      //   detailCountry(e);
      });
    });

    search.addEventListener("input", (e) => {
      let searchText = e.target.value;
      searchCountry(searchText, "name");
    });

    region.addEventListener("change", (e) => {
      let searchText = e.target.value;
      searchCountry(searchText, "region");
    });
  }
}
