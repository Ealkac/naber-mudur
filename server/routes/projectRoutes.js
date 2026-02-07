const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');
const { validateProject } = require('../middleware/validationMiddleware');

const router = express.Router();

// All project routes are protected
router.use(auth);

router.post('/', validateProject, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', validateProject, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
