import express from 'express';
import LinksRoutes from './routes/links';

const app = express();

app.use(LinksRoutes);

export default app;