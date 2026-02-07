import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ProjectForm from '../components/ProjectForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/projects');
      setProjects(response.data.projects);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please try again.');
      toast.error('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axiosInstance.delete(`/projects/${projectId}`);
      toast.success('Project deleted successfully!');
      fetchProjects(); // Re-fetch projects to update the list
    } catch (err) {
      console.error('Failed to delete project:', err);
      toast.error('Failed to delete project.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        await axiosInstance.put(`/projects/${editingProject.id}`, formData);
        toast.success('Project updated successfully!');
      } else {
        await axiosInstance.post('/projects', formData);
        toast.success('Project added successfully!');
      }
      setIsModalOpen(false);
      fetchProjects(); // Re-fetch projects
    } catch (err) {
      console.error('Failed to save project:', err.response?.data || err.message);
      const errors = err.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
            errors.forEach(error => toast.error(`${error.path}: ${error.message}`));
        } else {
            toast.error(err.response?.data?.message || 'Failed to save project.');
        }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='py-8'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-4xl font-extrabold text-gray-900 mb-8'
      >
        Welcome, {user?.username}!
      </motion.h1>

      <Card className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Your Profile</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Username:</strong> {user?.username}</p>
      </Card>

      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Your Projects</h2>
        <Button onClick={handleAddProject} variant='primary'>
          Add New Project
        </Button>
      </div>

      {loading && (
        <div className='flex justify-center items-center h-48'>
          <LoadingSpinner size='lg' className='text-indigo-600' />
        </div>
      )}

      {error && (
        <div className='text-red-600 bg-red-100 p-4 rounded-md text-center'>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='bg-white p-8 rounded-lg shadow-lg text-center text-gray-600'
        >
          <h3 className='text-xl font-semibold mb-4'>No projects yet!</h3>
          <p className='mb-6'>Start by adding your first project to showcase your work.</p>
          <Button onClick={handleAddProject} variant='primary'>
            Add Your First Project
          </Button>
        </motion.div>
      )}

      <motion.div layout className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AnimatePresence>
          {!loading && !error && projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={projectVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-lg shadow-md p-6 flex flex-col'
            >
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className='w-full h-48 object-cover rounded-md mb-4' />
              )}
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>{project.title}</h3>
              <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{project.description}</p>
              <div className='mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-100'>
                {project.projectUrl && (
                  <Button as='a' href={project.projectUrl} target='_blank' rel='noopener noreferrer' variant='outline' className='text-xs'>
                    View Project
                  </Button>
                )}
                {project.githubUrl && (
                  <Button as='a' href={project.githubUrl} target='_blank' rel='noopener noreferrer' variant='outline' className='text-xs'>
                    GitHub
                  </Button>
                )}
                <Button onClick={() => handleEditProject(project)} variant='secondary' className='text-xs'>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteProject(project.id)} variant='danger' className='text-xs'>
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <ProjectForm
          onSubmit={handleFormSubmit}
          initialData={editingProject || {}}
          isEditing={!!editingProject}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
