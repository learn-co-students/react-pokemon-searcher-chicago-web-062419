import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    filter: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokemons => this.setState({ pokemons }))
  }

  handleChange = (event, value) => {
    this.setState({filter: value})
  }

  filteredPokemons = () => {
    return this.state.pokemons.filter(pokemon => {
      return pokemon.name.includes(this.state.filter)
    })
  }

  addPokemon = (newPokemon) => {
    this.setState((prevState) => {
      return {pokemons: [...prevState.pokemons, newPokemon] }
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={(event, {value}) => this.handleChange(event, value)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.filter ? this.filteredPokemons() : this.state.pokemons}/>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
} 

export default PokemonPage
