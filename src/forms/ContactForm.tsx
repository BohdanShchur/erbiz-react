import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<FormInputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setSubmittedData(data);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <TextField
          label="Name"
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Name cannot contain digits or special symbols',
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          variant="outlined"
        />
        <TextField
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Email format is invalid',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          variant="outlined"
        />
        <TextField
          label="Message"
          {...register('message', {
            maxLength: {
              value: 500,
              message: 'Message cannot be longer than 500 symbols',
            },
          })}
          error={!!errors.message}
          helperText={errors.message?.message}
          variant="outlined"
          multiline
          rows={4}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>

      {submittedData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Submitted Data:
          </Typography>
          <Typography variant="body1"><strong>Name:</strong> {submittedData.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {submittedData.email}</Typography>
          <Typography variant="body1"><strong>Message:</strong> {submittedData.message}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ContactForm;
