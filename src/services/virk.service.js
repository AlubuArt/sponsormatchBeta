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
  method: 'get',
  url: 'http://distribution.virk.dk/cvr-permanent/virksomhed/_search\n',
  headers: { 
    'Authorization': 'Basic SkNfVmlzdWVsRGVzaWduX0NWUl9JX1NLWUVOOjhlYWViNmVmLTI0ZWUtNGFhZi04OTMzLTg5OWE3ZWJkNjY3ZA==', 
    'Content-Type': 'application/json',
    
  },
  data : data
};

export const testVirk = () => {
console.log(config)
let obbb = 1;
axios(config).then((response) => {
  obbb = JSON.stringify(response.data)
  window.console.log(obbb)
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

}

