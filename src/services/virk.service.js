import axios from 'axios';
const virkUserID = 'JC_VisuelDesign_CVR_I_SKYEN';
const virkPassword = '8eaeb6ef-24ee-4aaf-8933-899a7ebd667d';
const url = 'http://distribution.virk.dk/cvr-permanent/virksomhed/_search'
const endPoint = '/cvr-permanent/virksomhed/_search'

export const testVirk = () => {
    axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
    
}

var data = JSON.stringify({"_source":["Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn"],"query":{"term":{"Vrvirksomhed.cvrNummer":"33301022"}}});

var config = {
  method: 'get',
  url: 'http://distribution.virk.dk/cvr-permanent/virksomhed/_search',
  headers: { 
    'Authorization': 'Basic SkNfVmlzdWVsRGVzaWduX0NWUl9JX1NLWUVOOjhlYWViNmVmLTI0ZWUtNGFhZi04OTMzLTg5OWE3ZWJkNjY3ZA==', 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});




