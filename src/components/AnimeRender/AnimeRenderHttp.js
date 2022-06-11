const AnimeRenderHttp = (httpRequest,id,setIsLoading,setHttpData,setDisplay) => {
    if (httpRequest) {
        setIsLoading(true);
        let query = `
        query ($id: Int) {
          Media(type: ANIME, id:$id) {
            title {
              romaji
              english
            }
            description
           coverImage{
            extraLarge
            large
            medium
           }
            characters(role:MAIN) {
              nodes {
                id
                name {
                  first
                  last
                }
                description
                image{
                  large
                  medium
                }
              }
            }
          }
        }
        `;
  
        let variables = {
          id: id,
        };
  
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
  
        setTimeout(() => {
          fetch(url, options)
            .then((response) => {
              return response.json().then((json) => {
                return response.ok ? json : Promise.reject(json);
              });
            })
            .then((response) => {
              setHttpData(response.data.Media);
              setIsLoading(false);
              setDisplay(true);
            })
            .catch((err) => {
              alert("Error, check console");
              setIsLoading(false);
            });
        }, 5);
      }
};

export default AnimeRenderHttp;