export function ListOfMovies ({ movies }) {

    return(
      <ul>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))
      }
    </ul>
    )
  }

export function NoMoviesResult () {
    return(
      <p>No hay resultados para esta búsqueda</p>
    )
  }

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies   
         ? <ListOfMovies movies={movies} />
         : <NoMoviesResult />
    )
}