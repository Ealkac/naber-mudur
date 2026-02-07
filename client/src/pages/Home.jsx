import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 py-8'
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
        className='text-5xl md:text-6xl font-extrabold text-gray-900 mb-6'
      >
        Welcome to <span className='text-indigo-600'>Woodiez</span> Portfolio
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
        className='text-lg md:text-xl text-gray-700 max-w-2xl mb-8'
      >
        Showcase your amazing projects and skills to the world. A modern platform for developers to manage their professional portfolio.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className='flex space-x-4'
      >
        <Button as={Link} to='/register' variant='primary'>
          Get Started
        </Button>
        <Button as={Link} to='/login' variant='outline'>
          Login
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
