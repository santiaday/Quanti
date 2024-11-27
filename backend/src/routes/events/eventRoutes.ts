// src/routes/eventRoutes.ts
import express from 'express';
import { createEvent, listEvents } from '../../controllers/events/eventController';

const router = express.Router();

router.post('/events', createEvent);
router.get('/events', listEvents);

export default router;
