// https://anilist.github.io/ApiV2-GraphQL-Docs/

let Data;

const check = (props) => {
  let query = `
  query ($search: String) {
    Media(type:ANIME,search: $search){
        characters{
            nodes{
                name{
                    first
                    last
                }
                gender
            }
        }
    }
   }
  `;

  // Define our query variables and values that will be used in the query request
  let variables = {
    // id: 11741,
    search: props,
    page: 1,
    // perPage: 3,
  };

  // Define the config we'll need for our Api request

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options)
    .then((response) => {
      return response.json().then((json) => {
        return response.ok ? json : Promise.reject(json);
      });
    })
    .then((response) => {
      console.log(response);
      Data = response;
    })
    .catch((err) => {
      alert("Error, check console");
      console.error(err);
    });

  return null;
};

export default check;
