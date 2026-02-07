import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const success = await register(username, email, password);
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
        <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-6'>Register for Woodiez</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            label='Username'
            id='username'
            type='text'
            autoComplete='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: '' }));
            }}
            required
            error={errors.username}
          />
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
            autoComplete='new-password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            required
            error={errors.password}
          />
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className='mt-6 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
            Login here
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default Register;
