import { useState, useEffect } from 'react';

const useTheMovieDb = (url) => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    setLoading(true)
    console.log('Sending Http request to URL: ' + url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error when access the movie db');
        }
        return response.json();
      })
      .then(({ results }) => {
        setResults(results)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false))
  }, [url])


  return [loading, results]
}

export default useTheMovieDb