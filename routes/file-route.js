import express from 'express';

export const fileRouter = express.Router();

fileRouter.get('/list', (req, res) => {
	res.json({ message: 'list' });
});

fileRouter.get('/data', (req, res) => {
	res.json({ message: 'data' });
});
