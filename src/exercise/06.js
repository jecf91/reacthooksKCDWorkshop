// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [fetchStatus, setFetchStatus] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  const {status, pokemon, error} = fetchStatus

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setFetchStatus({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setFetchStatus({pokemon: pokemonData, status: 'resolved'})
      })
      .catch(error => {
        setFetchStatus({error, status: 'rejected'})
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a Pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
