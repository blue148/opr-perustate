const fetch = require("node-fetch");
require('dotenv').config();

module.exports = async function() {
  console.log( "Fetching new github stargazers count…" );
  let token = process.env.TOKEN;
  let space = process.env.SPACEID;

  return fetch(`https://cdn.contentful.com/spaces/${space}/entries?access_token=${token}`)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
	   console.log(json);
      // prune the data to return only what we want
      return {
        content: json.fields
      };
    });
};