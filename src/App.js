import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core'
import './App.css';
import MovieSuggest from './components/MovieSuggest/View';
import SimilarMovies from './components/SimilarMovies/View';

const App = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  return (
    <Container maxWidth="xl" className='App'>
      <Grid container spacing={5}>
        <Grid item xs>
          <MovieSuggest onMovieSelect={setSelectedMovieId}></MovieSuggest>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs>
          {
            selectedMovieId && <SimilarMovies movieId={selectedMovieId}></SimilarMovies>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;
