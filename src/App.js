import React, { Component } from 'react';

import Container from './components/Container';
import Form from './components/Form';

import CardNumberField from './components/Fields/CardNumberField';
import CardDateField from './components/Fields/CardDateField';
import SocialNumberField from './components/Fields/SocialNumberField';
import SubmitButton from './components/SubmitButton';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isValid: false,
      isSubmitted: false,
      currentFocused: 0,
    };

    this.fields = [];
  }

  focusNextField = () => {
    const { currentFocused } = this.state;

    if (currentFocused < this.fields.length - 1) {
      this.fields[currentFocused + 1].focusIt();
      this.setState({ currentFocused: currentFocused + 1 });
    }
  }

  setValueValid = (value) => {
    this.setState({ isValid: value });
  }

  handleSubmit = (e) => {
    const { currentFocused } = this.state;

    e.preventDefault();
    if (currentFocused === this.fields.length) {
      this.setState({ isSubmitted: true });
    }
  }

  render() {
    const { isValid, isSubmitted } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <CardNumberField
            ref={(el) => { this.fields[0] = el; }}
            onCompleted={this.focusNextField}
            disabled={isSubmitted}
            autoFocus
          />
          <CardDateField
            ref={(el) => { this.fields[1] = el; }}
            onCompleted={this.focusNextField}
            disabled={isSubmitted}
          />
          <SocialNumberField
            ref={(el) => { this.fields[2] = el; }}
            disabled={isSubmitted}
          />
          <SubmitButton disabled={!isValid} />
        </Form>
      </Container>
    );
  }
}

export default App;
