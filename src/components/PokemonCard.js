import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    showFront: true
  };

  toggleImage = () => {
    this.setState({ showFront: !this.state.showFront });
  };

  render() {
    const pokemon = this.props.pokemon;
    const imageURL = this.state.showFront
      ? pokemon.sprites.front
      : pokemon.sprites.back;
    const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokemonHP = pokemon.stats.filter(stat => stat.name === 'hp')[0]

    return (
      <Card>
        <div>
          <div className="image" onClick={() => this.toggleImage()} >
            <img src={imageURL} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{pokemonName}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {pokemonHP.value}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
