import { useEffect, useState, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se pude buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con número')
      return
    }
    
    if (search.length < 3) {
      setError('La busqueda debe tener almenos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }

}

function App () {
  const { search, updateSearch, error} = useSearch()
  const { movies, loading, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if(newQuery.startsWith(' ')) return
    updateSearch(event.target.value )
  }

  return (
    <div className='page'>

      <h1>Buscador de Películas</h1>
      <header>  
      <form className='form' onSubmit={handleSubmit}>
        <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Mtarix...' />
        <button type='submit'>Buscar</button>
      </form>
      {error && <p style={{color: 'red', display: 'flex', justifyContent: 'center'}}>{error}</p>} 
      </header>

      <main>
        {
          loading ?  <p style={{ display: 'flex', justifyContent: 'center'}}>Cargando...</p> : <Movies movies={movies}/>
        }
        <Movies movies={movies}/> 
      </main>
    </div>
  )
}

export default App
