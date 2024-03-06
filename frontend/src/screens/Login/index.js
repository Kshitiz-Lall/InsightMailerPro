import React from 'react';
import { Grid, Typography, TextField, Button, Stack, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const handleLogin = (values) => {
    // Implement your login logic here
    console.log('Username:', values.username);
    console.log('Password:', values.password);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {/* Left part (2/3 of the screen) */}
        <div style={{ background: 'linear-gradient(270deg, rgba(194,176,255,1) 0%, rgba(234,219,255,1) 100%)', height: '100vh' }}>
          {/* Content for left part */}
        </div>
      </Grid>
      <Grid item xs={4}>
        {/* Right part (1/3 of the screen) */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
              username: Yup.string().required('Username is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing={2}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Login
                  </Typography>
                  <Field
                    name="username"
                    as={TextField}
                    label="Username"
                    fullWidth
                    margin="normal"
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                  <Typography variant="body2" align="center">
                    Don't have an account? <Link href="/register">Register here</Link>
                  </Typography>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
