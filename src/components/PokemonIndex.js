import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
// import Search from './Search'
import _ from "lodash"; // Library of pre-written methods that you can import and pull different functions

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    filter: ""
  };

  // * fetch and update state upon the load of component / i.e the page is successfully rendered
  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(res => res.json())
      .then(data => this.setState({ pokemon: data }));
  }

  handleChange = (event, value) => {
    this.setState({ filter: value });
  };

  filteredPokemons = () => {
    return this.state.pokemon.filter(pokemon =>
      pokemon.name.includes(this.state.filter)
    );
  };

  addPokemon = newPokemon => {
    this.setState(prevState => {
      return { pokemon: [...prevState.pokemon, newPokemon] };
    });
  };

  // * Delete Actions - Delete data from database and then update state - which will trigger a re-render

  removePokemon = id => {
    let prevState = this.state.pokemon;
    let index = prevState.findIndex(poke => poke.id === id);
    let deletedItem = prevState.splice(index, 1);
    let newState = prevState;
    this.setState({ pokemon: newState });
  };

  deletePokemon = id => {
    fetch(`http://localhost:3000/pokemon/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(this.removePokemon(id))
      .catch(err => console.log(err));
  };

  // * _debounce - callback function that takes in a function and time. It will delay execution of the function so that search doesnt fire upon every key stroke

  render() {
    console.log(this.state.pokemon);
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(
            (event, { value }) => this.handleChange(event, value),
            300
          )}
          showNoResults={false}
        />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <PokemonCollection
          pokemon={
            this.state.filter ? this.filteredPokemons() : this.state.pokemon
          }
          deletePokemon={this.deletePokemon}
        />
      </div>
    );
  }
}

export default PokemonPage;
