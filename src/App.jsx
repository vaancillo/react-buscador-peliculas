import { useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ query })
  }

  const handleChange = (event) => {
    setQuery(event.target.value )
  }

  return (
    <div className='page'>

      <h1>Buscador de Películas</h1>
      <header>  
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The Mtarix...' />
        <button type='submit'>Buscar</button>
      </form>
      </header>

      <main>
        <Movies movies={movies}/> 
      </main>
    </div>
  )
}

export default App
