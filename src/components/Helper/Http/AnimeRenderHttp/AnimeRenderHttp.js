import { useContext } from "react";
import AnimeRenderContext from "../../Context/AnimeRender/AnimeRenderContext";

let Data;

const AnimeRenderHttp = (id) => {
  let query = `
  query ($id: Int) {
    Media(type: ANIME, id:$id) {
      title {
        romaji
        english
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

  fetch(url, options)
    .then((response) => {
      return response.json().then((json) => {
        return response.ok ? json : Promise.reject(json);
      });
    })
    .then((response) => {
      console.log(response.data.Media);
      Data = response.data.Media;
    })
    .catch((err) => {
      alert("Error, check console");
      Data = null;
    });

  return Data;
};

export default AnimeRenderHttp;
