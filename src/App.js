import React from 'react';

import Container from './components/Container';
import Form from './components/Form';
import CardNumberForm from './components/CardNumberForm';
import CardDateForm from './components/CardDateForm';
import SocialNumberForm from './components/SocialNumberForm';
import SubmitButton from './components/SubmitButton';

function App() {
  return (
    <Container>
      <Form>
        <CardNumberForm />
        <CardDateForm />
        <SocialNumberForm />
        <SubmitButton />
      </Form>
    </Container>
  );
}

export default App;
