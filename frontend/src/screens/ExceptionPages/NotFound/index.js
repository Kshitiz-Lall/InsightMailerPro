import React from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Typography variant="h1">404</Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Typography variant="h5">Page Not Found</Typography>
      </motion.div>
      <motion.div
        style={{ marginTop: '20px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Button variant="contained" color="primary" href="/">
          Go Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
