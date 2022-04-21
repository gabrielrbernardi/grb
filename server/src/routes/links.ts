import express from 'express';
import Links from '../controllers/links';

const routes = express.Router();

const links = new Links();

routes.post("/links", links.create);
routes.get("/links", links.listAll);
routes.put("/links/:id", links.update);
routes.delete("/links/:id", links.delete);

routes.get("/link/id/:id", links.findById);
routes.get("/link/linkName/:linkName", links.findByLinkName);
routes.get("/link/link/:link", links.findByLink);

export default routes;