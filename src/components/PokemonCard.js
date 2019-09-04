import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(){
    super()
    this.state = {
      showingBack: false
    }
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {showingBack: !prevState.showingBack}
    })
  }

  getHp = (stats) => {
    return stats.filter(stat => stat.name === 'hp')[0].value
  }

  render() {
    let {name, sprites: {front, back}, stats} = this.props.pokemon
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.state.showingBack ? back : front} alt={name} />
          </div>
          <div className="content">
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
    )
  }
}

export default PokemonCard
