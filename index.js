'use strict';

const apiKey='W77Y4hO6Va9VD9Enzxvjh2oNWyBOPtZb4jCnDexQ';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}
function displayResults(responseJson) {
    $('.results').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        console.log(responseJson);
        $('.results').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <h4>${responseJson.data[i].states}</h4>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].url}</p>
        </li>`
      )};
  
  };
function getParksList(stateName, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: stateName,
        limit: maxResults
    };
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;
    console.log(url);
    fetch(url) 
        .then(response => {
        if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(response => displayResults(response))
        .catch(err => {
          $('.results').text(`Something went wrong: ${err.message}`);
        });
    }
function watchForm() {
    $('.park-finder').submit('.submit-button', e => {
        e.preventDefault();
        let stateName = $('.park-state').val();
        let maxResults = $('.results-max').val();
        getParksList(stateName, maxResults);
        console.log(stateName,maxResults);
    });
}

$(watchForm);
