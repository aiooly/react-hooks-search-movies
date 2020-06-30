import React, { Component } from 'react'
import { TextField, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export default class MovieSuggest extends Component {
  state = {
    loading: false,
    options: [],
    query: '',
  }

  searchMovie = () => {
    const query = this.state.query

    if (!query) return

    this.setState({ loading: true })

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=432ea214d5481d224e14b555d6d5869b&language=en-US&query=${query}&page=1&include_adult=false`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not search movies!');
        }
        return response.json();
      })
      .then(({ results }) => {
        const options = results.map(movie => ({ value: movie.id, name: movie.title }))
        this.setState({ options });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    const { loading, options } = this.state

    return (
      <Autocomplete
        id="asynchronous-demo"
        onChange={(event, newValue) => {
          this.props.onMovieSelect(newValue?.value)
          if (!newValue) {
            this.setState({ options: [] })
          }
        }}
        onInputChange={(event, newInputValue) => {
          this.setState({ query: newInputValue }, this.searchMovie)
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search similar movies"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    )
  }
}