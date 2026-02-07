import React from 'react';
import { motion } from 'framer-motion';

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
};

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
  };

  return (
    <motion.div
      variants={spinnerVariants}
      animate='animate'
      className={`border-solid border-current border-t-transparent rounded-full ${sizeClasses[size]} ${className}`}
      role='status'
      aria-label='Loading'
    >
      <span className='sr-only'>Loading...</span>
    </motion.div>
  );
};

export default LoadingSpinner;
