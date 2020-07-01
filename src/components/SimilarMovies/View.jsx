import React, { useEffect } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import useTheMovieDb from '../../hooks/theMovieDb';

const SimilarMovies = ({ movieId }) => {
  const [loading, movies] = useTheMovieDb(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=432ea214d5481d224e14b555d6d5869b&language=en-US&page=1`)

  useEffect(() => {
    return () => {
      console.log("Component will unmount ....");
    }
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (!movieId || movies.length === 0) {
    return (
      <span>
        No similar movies found
      </span>
    )
  }

  return (
    <div className='similar-movies-container'>
      <GridList cols={4} spacing={10}>
        {movies.map((movie) => (
          <GridListTile
            key={movie.id}
            className='movie'
            onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')} >
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
            <GridListTileBar
              title={movie.title}
              subtitle={<span>{movie.overview}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default SimilarMovies