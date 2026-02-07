import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className='bg-white shadow-sm p-4 sticky top-0 z-40'
    >
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold text-indigo-600'>
          Woodiez
        </Link>
        <div className='flex items-center space-x-4'>
          {user ? (
            <>
              <Link to='/dashboard' className='text-gray-700 hover:text-indigo-600 transition-colors'>
                Dashboard
              </Link>
              <Button onClick={handleLogout} variant='secondary'>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to='/login' className='text-gray-700 hover:text-indigo-600 transition-colors'>
                Login
              </Link>
              <Button as={Link} to='/register' variant='primary'>
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
