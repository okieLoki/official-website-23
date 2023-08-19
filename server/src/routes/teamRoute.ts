import express from 'express'
import {addTeamMember, getTeamMembers, deleteTeamMember} from '../controllers/teamMemberController'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/', auth,  addTeamMember)
router.get('/', auth, getTeamMembers)
router.delete('/:id', auth, deleteTeamMember)

export {router as teamRoute}
