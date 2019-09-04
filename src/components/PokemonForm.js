import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = () => {
    const pokeData = {
      name: this.state.name,
      stats: [
        {
          name: 'hp',
          value: this.state.hp
        }
      ],
      sprites: {
        front: this.state.frontUrl,
        back: this.state.backUrl
      }
    }
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(pokeData)
    })
    .then(res => res.json())
    .then(pokemon => this.props.addPokemon(pokemon))
  }

  handleChange = (event, {name, value}) => {
    this.setState({
      [name] : value
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid onChange={this.handleChange} label="Name" placeholder="Name" name="name" />
            <Form.Input fluid onChange={this.handleChange} label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid onChange={this.handleChange} label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid onChange={this.handleChange} label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
