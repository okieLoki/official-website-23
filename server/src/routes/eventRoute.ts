import express from 'express'
import {addEvent, getEvents, deleteEvent} from '../controllers/eventController'

const router = express.Router()

router.post('/', addEvent)
router.get('/', getEvents)
router.delete('/:id', deleteEvent)

export {router as eventRoute}
