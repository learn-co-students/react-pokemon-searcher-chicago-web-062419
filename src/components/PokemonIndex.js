import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";
const URL = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  state = {
    pokemonList: [],
    searchInput: ""
  };

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemonList: data });
      })
      .catch(err => (err ? console.log(err) : null));
  }

  handleSubmit = (e, newPokemonObj) => {
    e.preventDefault();
    fetch(URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: newPokemonObj.name,
        stats: [
          {
            value: newPokemonObj.hp,
            name: "hp"
          }
        ],
        sprites: {
          front: newPokemonObj.frontUrl,
          back: newPokemonObj.backUrl
        }
      })
    })
      .then(res => res.json())
      .then(newPokemon => {
        this.setState({ pokemonList: [...this.state.pokemonList, newPokemon] });
      })
      .catch(err => (err ? console.log(err) : null));
  };

  handleSearchChange = (event, {value}) => {
    this.setState({ searchInput: value });
  };

  render() {
    const searchedPokemon = this.state.pokemonList.filter(pokemon =>
      pokemon.name.includes(this.state.searchInput)
    );
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleSubmit={this.handleSubmit} />
        <br />
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 100)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemonList={searchedPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
