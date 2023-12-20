import express from 'express';

const app = express();
const PORT = 5200;

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
