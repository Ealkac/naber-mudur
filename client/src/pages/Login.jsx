import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4'
    >
      <Card className='max-w-md w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-6'>Login to Woodiez</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            label='Email address'
            id='email'
            type='email'
            autoComplete='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            required
            error={errors.email}
          />
          <Input
            label='Password'
            id='password'
            type='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            required
            error={errors.password}
          />
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className='mt-6 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link to='/register' className='font-medium text-indigo-600 hover:text-indigo-500'>
            Register here
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default Login;
