import { useEffect, useState, useRef } from 'react'

export function useSearch (){
  
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const firstInput = useRef(true)
  
    useEffect(() => {

      if(firstInput.current){
        firstInput.current = query === ""
        return
      }

      if(query === "") {
        setError("No se puede buscar una pelicula vacia") 
        return
      }
  
      setError(null)
    }, [query])
  
    return {query, setQuery, error}
  }