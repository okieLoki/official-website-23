import express from 'express'
import {addProject, getProjects, deleteProject} from '../controllers/projectController'

const router = express.Router()

router.post('/', addProject)
router.get('/', getProjects)
router.delete('/:id', deleteProject)

export {router as projectRoute}
