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
      currentFocused: 0,
    };

    this.fields = [];
  }

  focusNextField = () => {
    const { currentFocused } = this.state;

    this.fields[currentFocused + 1].focusIt();

    this.setState({ currentFocused: currentFocused + 1 });
  }

  render() {
    return (
      <Container>
        <Form>
          <CardNumberField ref={(el) => { this.fields.push(el); }} autoFocus />
          <CardDateField ref={(el) => { this.fields.push(el); }} />
          <SocialNumberField ref={(el) => { this.fields.push(el); }} />
          <SubmitButton />
        </Form>
      </Container>
    );
  }
}

export default App;
