import './App.css'
import { Movies } from './components/Movies'

function App () {
  const { movies: mappedMovies } = useMovies()

  return (
    <div className='page'>

      <h1>Buscador de Películas</h1>
      <header>
      <form className='form'>
        <input placeholder='Avengers, Star Wars, The Mtarix...' />
        <button type='submit'>Buscar</button>
      </form>
      </header>

      <main>
        <Movies movies={mappedMovies}/>
      </main>
    </div>
  )
}

export default App
