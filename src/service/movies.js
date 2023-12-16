const APIKEY = "4287ad07"
export async function searchMovies ({query}){

    if(query === "") return null

    try{

      const response = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`);
      const json = await response.json();
      const movies = json?.Search;


      return movies?.map((el) => ({
        id: el.imdbID,
        title: el.Title,
        type: el.Type,
        year: el.Year,
        poster: el.Poster
      }))
    }catch(error){
        throw new Error("Error searching movies")
    }


}