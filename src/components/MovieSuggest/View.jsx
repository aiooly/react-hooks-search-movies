import React, { useState } from 'react'
import { TextField, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTheMovieDb from '../../hooks/theMovieDb';

const MovieSuggest = (props) => {
  const [query, setQuery] = useState('')

  const [loading, results] = useTheMovieDb(`https://api.themoviedb.org/3/search/movie?api_key=432ea214d5481d224e14b555d6d5869b&language=en-US&query=${query}&page=1&include_adult=false`)

  const options = results.map(movie => ({ value: movie.id, name: movie.title }))

  return (
    <Autocomplete
      id="asynchronous-demo"
      onChange={(event, newValue) => {
        props.onMovieSelect(newValue?.value)
      }}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue)
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

export default MovieSuggest