import { useEffect, useMemo, useRef, useState } from "react";
import { searchMovies } from "../service/movies";

export function useMovie({query, sort}){
    const [responseMovies, setResponseMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const prevQuery = useRef()

    const getMovies = useMemo(() =>{
        return async ({query}) =>{
            if(query === prevQuery.current) return  
            prevQuery.current = query
    
            try{
                setIsLoading(true)
                setError(null)
    
                const newMovie = await searchMovies({query})
                setResponseMovies(newMovie)  
    
            }catch(error){
                setError(error.message)
            }finally{
                setIsLoading(false)
            }
    
        }
    }, [query])

    
    const sortedMovies = useMemo(() =>{
        if (!responseMovies || responseMovies.length === 0) {
            return [];
          }
        return (
            sort 
        ? [...responseMovies]?.sort((a, b) => a.year.slice(0,4) - b.year.slice(0,4)).reverse()
        : responseMovies
        )
    }, [sort,responseMovies ]) 


    return {movies: sortedMovies, getMovies, isLoading}
}


