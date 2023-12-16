import { useState, useCallback } from 'react'
import "./App.css"
import debounce from "just-debounce-it";

import { Movie } from './components/movies';
import { useMovie } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';


function App() {
  const [sort, setSort] = useState(false)
  const {query, setQuery, error} = useSearch();
  const {movies, getMovies, isLoading} = useMovie({query, sort});

  const debaunceMovie = useCallback((
    debounce(newquery =>{
      getMovies({query:newquery})
    },300)
  ), []) 
  
  function handleSubmit(event){
    event.preventDefault();
    getMovies({query})
  }

  function handleSort(){
    setSort(!sort)
  }

  function onChange(event){
    const newquery = event.target.value 
    setQuery(newquery)
    debaunceMovie(newquery)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form action="form" onSubmit={handleSubmit}>
          <div className="field">
              <input style={{border: "1px solid transparent", borderColor: error ? "red" : "transparent" }} value={query} onChange={onChange} type="text" placeholder='Avergers, Star Wars, The Matrix...' />
              <div>
                <small>Filtrar mas recientes</small>
                <input onClick={handleSort} type="checkbox" name="check" id="check" />
            </div>
            <button type='submit'>Buscar</button>
          </div>

        </form>
        {error && <p className='error' style={{color:"red"}}>{error}</p> }
      </header>

      <main>
        {
          isLoading ? <h1>Cargando...</h1> : <Movie movies={movies}></Movie>
        }
         
      </main>

    </div>     

  )
}

export default App
