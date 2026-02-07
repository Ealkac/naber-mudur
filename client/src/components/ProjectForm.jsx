import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { motion } from 'framer-motion';

const ProjectForm = ({ onSubmit, initialData = {}, isEditing = false, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData(initialData);
    }
  }, [isEditing, initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.description && formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (formData.imageUrl && !/^https?:\/\/.+\.(png|jpe?g|gif|svg)$/.test(formData.imageUrl)) newErrors.imageUrl = 'Invalid image URL';
    if (formData.projectUrl && !/^https?:\/\/.+/.test(formData.projectUrl)) newErrors.projectUrl = 'Invalid project URL';
    if (formData.githubUrl && !/^https?:\/\/.+/.test(formData.githubUrl)) newErrors.githubUrl = 'Invalid GitHub URL';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <Input
        label='Project Title'
        id='title'
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder='My Awesome Project'
      />
      <Input
        label='Description'
        id='description'
        type='textarea'
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder='A brief description of my project...'
      />
      <Input
        label='Image URL'
        id='imageUrl'
        value={formData.imageUrl}
        onChange={handleChange}
        error={errors.imageUrl}
        placeholder='https://example.com/image.png'
      />
      <Input
        label='Project URL'
        id='projectUrl'
        value={formData.projectUrl}
        onChange={handleChange}
        error={errors.projectUrl}
        placeholder='https://www.myproject.com'
      />
      <Input
        label='GitHub URL'
        id='githubUrl'
        value={formData.githubUrl}
        onChange={handleChange}
        error={errors.githubUrl}
        placeholder='https://github.com/myusername/myproject'
      />
      <div className='flex justify-end space-x-2 pt-4'>
        <Button type='button' variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button type='submit' variant='primary'>
          {isEditing ? 'Update Project' : 'Add Project'}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProjectForm;
