import React, { useState, useEffect } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';

const SimilarMovies = ({ movieId }) => {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    if (!movieId) return

    console.log('Search similar movie for movieId: ', movieId);

    setLoading(true)

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=432ea214d5481d224e14b555d6d5869b&language=en-US&page=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not search similar movies!');
        }
        return response.json();
      })
      .then(({ results }) => {
        setMovies(results)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false))
    return () => {
      console.log("Clean up on every effect....");
    }
  }, [movieId])

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