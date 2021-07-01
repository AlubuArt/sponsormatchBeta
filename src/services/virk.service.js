const axios = require('axios');

let data = JSON.stringify({
  "_source": [
    "Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn"
  ],
  "query": {
    "term": {
      "Vrvirksomhed.cvrNummer": "33301022"
    }
  }
});

let config = {
  method: 'POST',
  url: 'http://distribution.virk.dk/cvr-permanent/virksomhed/_search',
 
  headers: { 
    "Authorization": 'Basic SkNfVmlzdWVsRGVzaWduX0NWUl9JX1NLWUVOOjhlYWViNmVmLTI0ZWUtNGFhZi04OTMzLTg5OWE3ZWJkNjY3ZA==',
    "Content-Type": 'application/json; charset=UTF-8',

  },
  data : data
};

export const testVirk = () => {

axios(config).then(function async (response)  {

  console.log(JSON.stringify(response.data));
  console.log("2")
})
.catch((error) => {
  console.log(error);
});

}




