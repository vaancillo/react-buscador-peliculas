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
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error} = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    const newQuery = event.target.value
    if(newQuery.startsWith(' ')) return
    updateSearch(newSearch)
    getMovies({ search: newSearch })
  }

  return (
    <div className='page'>

      <h1>Buscador de Películas</h1>
      <header>  
      <form className='form' onSubmit={handleSubmit}>
        <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Mtarix...' />
        <input type='checkbox' onChange={handleSort} checked={sort} />
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
