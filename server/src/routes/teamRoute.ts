import express from 'express'
import {addTeamMember, getTeamMembers, deleteTeamMember} from '../controllers/teamMemberController'

const router = express.Router()

router.post('/', addTeamMember)
router.get('/', getTeamMembers)
router.delete('/:id', deleteTeamMember)

export {router as teamRoute}
