import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      fitler: ""
    };
  }

  // Like DOMContentLoaded
  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(resp => resp.json())
      // Set state needs to be passed an object or a function
      // {pokemons} is the same as {pokemons: pokemons}
      .then(pokemons => this.setState({ pokemons }));
  }

  // ?
  handleChange = (event, value) => {
    this.setState({ filter: value });
  };

  filteredPokemons = () => {
    // Go into this.state.pokemons (array) and filter for the pokemon whose name includes the string this.state.filter
    return this.state.pokemons.filter(pokemon =>
      pokemon.name.includes(this.state.filter)
    );
  };

  addPokemon = newPokemon => {
    this.setState(prevState => {
      // Give me a clone of prevState and append newPokemon to the end of the array
      return { pokemons: [...prevState.pokemons, newPokemon] };
    });
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        {/* Comes from semantic UI */}
        <Search
          onSearchChange={(event, { value }) => this.handleChange(event, value)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection
          pokemons={
            this.state.filter ? this.filteredPokemons() : this.state.pokemons
          }
        />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
