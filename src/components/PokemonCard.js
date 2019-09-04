import React from "react";
// Import functionality from library
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  // def initialize
  constructor() {
    // Inherits from parent
    super();
    // Set initial state
    this.state = {
      // Boolean check
      showingBack: false
    };
  }

  // Handle card click
  handleClick = () => {
    this.setState(prevState => {
      // ?
      return { showingBack: !prevState.showingBack };
    });
  };

  // Console.log to see the structure of the data
  // In this case the HP is a deeply nested value

  getHp = stats => {
    // Filter thats for the one where stat name is hp. Take the 0th one and get its value
    stats.filter(stat => stat.name === "hp")[0].value;
  };

  render() {
    // destructure these values ONCE from props to avoid typing `this.props.pokemon.` over and over
    const {
      name,
      sprites: { front, back },
      stats
    } = this.props.pokemon;
    return (
      // Add click listener to component
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            {/* ? */}
            <img src={this.state.showingBack ? back : front} alt={name} />
          </div>
          <div className="content">
            {/* {this.props.pokemon.name} without destructuring */}
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHp(stats)} hp
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
