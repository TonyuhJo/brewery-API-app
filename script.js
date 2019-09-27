function showSearchStart(){
    console.log("showing search start");
    
    $('.search-form').html(`<form id="search-form" class="hidden">
        <img src="images/brewHoundLogo.png" alt="Brew Hound logo" class="logo2">
        <h3>Where would you like to search?</h3>
        <div class="city-state"><label for="search-city" class="search-city">City: </label>
        <input type="text" name="city-search" id="js-city-search" placeholder="Enter city name">
        <label for="search-state" class="search-state">State: </label>
        <select name="state" id="js-state-search">
            <option value="alabama">AL</option>
            <option value="alaska">AK</option>
            <option value="arizona">AZ</option>
            <option value="arkansas">AR</option>
            <option value="california">CA</option>
            <option value="colorado">CO</option>
            <option value="connecticut">CT</option>
            <option value="delaware">DE</option>
            <option value="florida">FL</option>
            <option value="georgia">GA</option>
            <option value="hawaii">HI</option>
            <option value="idaho">ID</option>
            <option value="illinois">IL</option>
            <option value="indiana">IN</option>
            <option value="iowa">IA</option>
            <option value="kansas">KS</option>
            <option value="kentucky">KY</option>
            <option value="louisiana">LA</option>
            <option value="maine">ME</option>
            <option value="maryland">MD</option>
            <option value="massachusetts">MA</option>
            <option value="michigan">MI</option>
            <option value="minnesota">MN</option>
            <option value="mississippi">MS</option>
            <option value="missouri">MO</option>
            <option value="montana">MT</option>
            <option value="nebraska">NE</option>
            <option value="nevada">NV</option>
            <option value="new_hampshire">NH</option>
            <option value="new_jersey">NJ</option>
            <option value="new_mexico">NM</option>
            <option value="new_york">NY</option>
            <option value="north_carolina">NC</option>
            <option value="north_dakota">ND</option>
            <option value="ohio">OH</option>
            <option value="oklahoma">OK</option>
            <option value="oregon">OR</option>
            <option value="pennsylvania">PA</option>
            <option value="rhode_island">RI</option>
            <option value="south_carolina">SC</option>
            <option value="south_dakota">SD</option>
            <option value="tennessee">TN</option>
            <option value="texas">TX</option>
            <option value="utah">UT</option>
            <option value="vermont">VT</option>
            <option value="virginia">VA</option>
            <option value="washington">WA</option>
            <option value="west_virginia">WV</option>
            <option value="wisconsin">WI</option>
            <option value="wyoming">WY</option>
        </select></div>
        <h3>Have a specific type of brewery in mind?</h3>
        <select name="search-type" id="js-type-search">
            <option value="">Show me all of them</option>
            <option value="micro">Micro</option>
            <option value="regional">Regional</option>
            <option value="brewpub">Brewpub</option>
            <option value="large">Large</option>
            <option value="planning">Planning</option>
            <option value="bar">Bar</option>
            <option value="contract">Contract</option>
            <option value="proprietor">Proprietor</option>
        </select><br><br>
        <input type="submit" value="Search" class="js-submit-search">
        </form>
        <section class="results hidden">
        </section>`);
}
    
function renderSearchStart(){
    console.log("rendering search start");
    
    $(".home-search").click(function(event){
      $('#search-form').removeClass("hidden");
      $('.main').addClass("hidden");
    })
}
    
function formatQueryParams(params){
    console.log("formatting query params");
    
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
    
function getBreweries(city, state, type){
    console.log("getting breweries");
    
    const params = {
      by_city: city,
      by_state: state,
      by_type: type
    };
    
    const queryString = formatQueryParams(params);
    const url = 'https://api.openbrewerydb.org/breweries?' + queryString;
    
    console.log(url);
    
    fetch(url)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}
    
function displayResults(responseJson){
    console.log(responseJson);
    $('.results').empty();
    
    if(responseJson.length > 0){
  
      $('.results').append(`<h2 class="results-start">Results</h2>`)
      for(let i = 0; i < responseJson.length; i++){
    
        let address = `${responseJson[i].street}<br>${responseJson[i].city}, ${responseJson[i].state}<br>${responseJson[i].postal_code}`;
    
        $('.results').append(`<li><h3>${responseJson[i].name}</h3>
        <p>${address}</p><br>
        <p>Phone: ${responseJson[i].phone}</p>
        <p><a href="${responseJson[i].website_url}" target='_blank' class="site-url">Visit their website</a></p>`)
      };
    } else {
      $('.results').append(`Sorry! It doesn't look like we have any results that match your search criteria. You may want to adjust your search and try again.`)
    }
    
    $('.results').removeClass("hidden");
}
    
function watchForm(){
    console.log("watching form");
    
    $('form').submit(event => {
      event.preventDefault();
      const city = $('#js-city-search').val();
      const state = $('#js-state-search').val();
      const type = $('#js-type-search').val();
      getBreweries(city, state, type);
      displayResults(responseJson);
    });
}
    
function loadApp(){
    showSearchStart();
    renderSearchStart();
    watchForm();
    
    console.log("app loaded");
}
    
$(loadApp);