import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core'
import './App.css';
import MovieSuggest from './components/MovieSuggest/View';
import SimilarMovies from './components/SimilarMovies/View';

class App extends Component {
  state = {
    selectedMovieId: null,
  };

  handleMovieSelect = movieId => {
    this.setState({ selectedMovieId: movieId });
  };

  render() {
    return (
      <Container maxWidth="xl" className='App'>
        <Grid container spacing={5}>
          <Grid item xs>
            <MovieSuggest onMovieSelect={this.handleMovieSelect}></MovieSuggest>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs>
            {
              this.state.selectedMovieId && <SimilarMovies movieId={this.state.selectedMovieId}></SimilarMovies>
            }
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
