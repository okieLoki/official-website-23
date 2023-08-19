import express from 'express'
import {addEvent, getEvents, deleteEvent} from '../controllers/eventController'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/', auth, addEvent)
router.get('/', auth, getEvents)
router.delete('/:id', auth, deleteEvent)

export {router as eventRoute}
