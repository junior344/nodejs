import express from 'express';
import albumController from '../controllers/album.controller.js';

const router = express.Router();

router.get('/albums', albumController.listAlbums);

router.get('/albums/:id', albumController.showAlbum);

router.post ('/albums/:id', albumController.updateAlbum);

router.get('/albums/create', albumController.createAlbumForm);

router.post('/albums/create', albumController.createAlbum);

export default router;