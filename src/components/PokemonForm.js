import React from "react";
import { Form } from "semantic-ui-react";

class PokemonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      hp: "",
      frontUrl: "",
      backUrl: ""
    };
  }

  handleChange = e => {
    const inputCheck = e.target.name;
    const inputValue = e.target.value
    inputCheck === 'name' ? 
    this.setState({name: inputValue}) :
    inputCheck === 'hp' ? 
    this.setState({hp: inputValue}) :
    inputCheck === 'frontUrl' ? 
    this.setState({frontUrl: inputValue}) :
    inputCheck === 'backUrl' ? 
    this.setState({backUrl: inputValue}) : null
  };
  
  // handleSubmit = e => {
  //   e.preventDefault();
  //   // debugger
  //   fetch(this.props.postUrl, {
  //     method: "POST",
  //     headers: {"Content-type": "application/json"},
  //     body: JSON.stringify(this.state)
  //   })
  //   .then(res => res.json())
  //   .then(console.log)
  // };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="hp"
              placeholder="hp"
              name="hp"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="frontUrl"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Back Image URL"
              placeholder="url"
              name="backUrl"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
