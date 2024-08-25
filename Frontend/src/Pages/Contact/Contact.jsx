import React, { useState } from 'react';
import { Typography, Container, TextField, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const translate = useSelector((state) => state.Localization.translation);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          {translate.contact}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={translate.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label={translate.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label={translate.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {translate.submit}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
