import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4 py-8'
    >
      <h1 className='text-6xl font-extrabold text-indigo-600 mb-4'>404</h1>
      <h2 className='text-3xl font-bold text-gray-800 mb-4'>Page Not Found</h2>
      <p className='text-lg text-gray-600 mb-8'>Sorry, the page you are looking for does not exist.</p>
      <Button as={Link} to='/' variant='primary'>
        Go to Home
      </Button>
    </motion.div>
  );
};

export default NotFound;
