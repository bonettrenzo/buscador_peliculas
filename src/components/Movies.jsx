 const ListOfMovies = ({movies}) =>{
    return(
        <ul className="movies">
        {movies.map((el) => (
          <li key={el.id} className="movie">
            <h3>{el.title}</h3>
            <p>{el.year}</p>
            <img src={el.poster} alt={el.title} />
          </li>
        ))}
      </ul>
    )
}
 const NotFoundMovies = () =>{
    return(
        <h1>No hay datos</h1>
    )
}

export function Movie({movies}){
    const hasMovies = movies?.length > 0; 
    return (
        hasMovies ? <ListOfMovies movies={movies} /> : <NotFoundMovies/>
    )
}