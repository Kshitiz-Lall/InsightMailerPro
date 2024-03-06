import { Box, Button, Grid, Paper, Stack, Step, StepLabel, Stepper, TextField, Typography, Link } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Toaster, toast } from 'sonner'
import { useHistory } from 'react-router-dom';

const RegistrationPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['User Details', 'Additional Details', 'Organization Details', 'Congratulations'];

  const handleNext = () => {
    console.log("Moving to next step");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    console.log("Moving to previous step");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <>
      <Toaster position="top-center" />
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
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
                mobileNumber: '',
                dob: '',
                address: '',
                companyName: '',
                employeeID: '',
                companyEmail: '',
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required'),
                companyName: Yup.string().required('Company Name is required'),
                employeeID: Yup.string().required('Employee ID is required'),
                companyEmail: Yup.string().email('Invalid email address').required('Company Email is required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  if (activeStep < steps.length - 1) {
                    handleNext();
                  }
                }, 400);
              }}
            >
              {({ errors, touched, submitForm }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Registration
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mr: 2 }}>
                      <Paper sx={{ p: 2 }}>

                        <Stepper activeStep={activeStep}>
                          {steps.map((label, index) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </Paper>
                      <div>
                        {activeStep === 0 && (
                          <Box sx={{ p: 2 }} elevation={0}>
                            <Stack spacing={2}>
                              <Typography variant="h6" gutterBottom>
                                User Details
                              </Typography>
                              <Field
                                name="firstName"
                                as={TextField}
                                label="First Name"
                                margin="normal"
                                error={touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                              />
                              <Field
                                name="lastName"
                                as={TextField}
                                label="Last Name"
                                margin="normal"
                                error={touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                              />
                              <Field
                                name="email"
                                as={TextField}
                                label="Email"
                                margin="normal"
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                              />
                              <Field
                                name="username"
                                as={TextField}
                                label="Username"
                                margin="normal"
                                error={touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                              />
                              <Field
                                name="password"
                                as={TextField}
                                label="Password"
                                type="password"
                                margin="normal"
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                              />
                            </Stack>
                          </Box>
                        )}
                        {activeStep === 1 && (
                          <Stack spacing={2}>
                            <Typography variant="h6" gutterBottom>
                              Additional Details
                            </Typography>
                            <Field
                              name="mobileNumber"
                              as={TextField}
                              label="Mobile Number"
                              margin="normal"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker />
                            </LocalizationProvider>
                            <Field
                              name="address"
                              as={TextField}
                              label="Address"
                              margin="normal"
                            />
                          </Stack>
                        )}
                        {activeStep === 2 && (
                          <Stack spacing={2}>
                            <Typography variant="h6" gutterBottom>
                              Organization Details
                            </Typography>
                            <Field
                              name="companyName"
                              as={TextField}
                              label="Company Name"
                              margin="normal"
                              error={touched.companyName && !!errors.companyName}
                              helperText={touched.companyName && errors.companyName}
                            />
                            <Field
                              name="employeeID"
                              as={TextField}
                              label="Employee ID"
                              margin="normal"
                              error={touched.employeeID && !!errors.employeeID}
                              helperText={touched.employeeID && errors.employeeID}
                            />
                            <Field
                              name="companyEmail"
                              as={TextField}
                              label="Company Email"
                              margin="normal"
                              error={touched.companyEmail && !!errors.companyEmail}
                              helperText={touched.companyEmail && errors.companyEmail}
                            />
                          </Stack>
                        )}
                        {activeStep === 3 && (
                          <div style={{ textAlign: 'center' }}>
                            <CheckCircleIcon sx={{ fontSize: 48, color: 'green' }} />
                            <Typography variant="h6" gutterBottom>
                              Congratulations! Registration Successful.
                            </Typography>
                            <Typography variant="body2" align="center">
                              Click here to <Link href="/login">Login</Link>
                            </Typography>
                          </div>
                        )}
                        <div style={{ marginTop: '1rem' }}>
                          {activeStep !== 0 && (
                            <Button onClick={handleBack} style={{ marginRight: '1rem' }}>
                              Back
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              submitForm();
                              if (activeStep !== steps.length - 1) {
                                handleNext();
                              }
                            }}
                          >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                          <button onClick={() => toast('My first toast')}>
                            Give me a toast
                          </button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationPage;
