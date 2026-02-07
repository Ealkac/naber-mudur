const Project = require('../models/project');

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, projectUrl, githubUrl } = req.body;
    const userId = req.user.id; // From authMiddleware

    const project = await Project.create({
      userId,
      title,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
    });

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    next(error);
  }
};

// Get all projects for the authenticated user
exports.getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await Project.findAll({ where: { userId } });

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};

// Get a single project by ID for the authenticated user
exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findOne({ where: { id, userId } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json({ project });
  } catch (error) {
    next(error);
  }
};

// Update a project by ID for the authenticated user
exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, imageUrl, projectUrl, githubUrl } = req.body;

    let project = await Project.findOne({ where: { id, userId } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    project = await project.update({
      title: title || project.title,
      description: description || project.description,
      imageUrl: imageUrl || project.imageUrl,
      projectUrl: projectUrl || project.projectUrl,
      githubUrl: githubUrl || project.githubUrl,
    });

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    next(error);
  }
};

// Delete a project by ID for the authenticated user
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findOne({ where: { id, userId } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    await project.destroy();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
