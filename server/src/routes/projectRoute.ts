import express from 'express'
import {addProject, getProjects, deleteProject} from '../controllers/projectController'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/', auth, addProject)
router.get('/', auth, getProjects)
router.delete('/:id', auth, deleteProject)

export {router as projectRoute}
