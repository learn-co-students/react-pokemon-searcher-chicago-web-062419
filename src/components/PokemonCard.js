// ! Things to learn:

import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    showingBack: false
  };

  // ! The original way I setState (super cumbersome)
  // handleClick = () => {
  //   this.state.side === "front"
  // ? this.setState({ side: "back" })
  //     : this.setState({ side: "front" });
  // };

  // ! Everytime there is a toggle option - should set state to true or false

  handleClick = () => {
    this.setState(prevState => {
      return { showingBack: !prevState.showingBack };
    });
  };

  // Returns array of all the HP's
  getHp = stats => stats.filter(stat => stat.name === "hp")[0].value;

  handleDelete = event => {
    // console.log(event.target.id)
    this.props.deletePokemon(parseInt(event.target.id, 10));
  };

  // ! Destructuring in props
  render() {
    // console.log(this.props)
    const {
      name,
      sprites: { front, back },
      stats,
      id
    } = this.props.poke;

    return (
      <Card>
        <div>
          <div onClick={this.handleClick} className="image">
            <img src={this.state.showingBack ? back : front} alt={name} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHp(stats)} HP
            </span>
          </div>
          <div>
            <button id={id} onClick={event => this.handleDelete(event)}>
              Delete
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;

{
  /* 
{this.state.side === "front" ? (
              <img
                src={this.props.poke.sprites.front}
                alt={this.props.poke.sprites.front}
              />
            ) : (
              <img
                src={this.props.poke.sprites.back}
                alt={this.props.poke.sprites.back}
              />
            )} */
}
