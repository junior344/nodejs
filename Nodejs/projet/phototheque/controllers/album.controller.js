import Album from '../models/album.model.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';;

export const listAlbums = async (req, res) => {
    const albums = await Album.find();
    res.render('albums', {
        title: 'Liste des albums',
        albums,
    });
}
export const createAlbumForm = (req, res) => {
    try{
        res.render('new-album', {
            title: 'Nouvel album',
            errors: req.flash('error'),
        });
    }catch (err){
        console.log(err);
        res.redirect('/albums/create');
    }
    

}
const upload = multer({ dest: 'uploads/' }); // Configurez le dossier de destination
upload.single('file'); // Utilisez upload.single pour un seul fichier

export const updateAlbum = async (req, res) => {
    const idAlbum = req.params.id.trim(); // Supprimez les espaces inutiles

    // Vérifiez si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(idAlbum)) {
        return res.status(400).send('Invalid album ID');
    }

    try {
        const album = await Album.findById(idAlbum);
        if (!album) {
            return res.status(404).send('Album not found');
        }

        console.log(req.files); // Utilisez req.file pour un seul fichier

        const uploadDir = path.join('../public/uploads', idAlbum);
        const localPath = path.join(uploadDir, req.files.file.name);
        console.log("chemin local :"+localPath);

        // Créez le répertoire s'il n'existe pas
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Déplacez le fichier
        console.log("chemin les mv :"+req.file.mv);
        await req.file.mv(localPath);

        res.redirect(`/albums/${idAlbum}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export const showAlbum = async (req, res) => {
    const { id } = req.params;
    const album = await Album.findById(id);
    res.render('album', {
        title: album.title,
        album,
    });
}

export  const  createAlbum = async (req, res) => {
    try{
        if (!req.body.title) {
            req.flash('error', "Le titre de l'album est obligatoire");
            return res.redirect('/albums/create');
        }
        await Album.create({
            title: req.body.title,
        });
        res.redirect('/');
    }catch (err){
        req.flash('error', "Une erreur est survenue lors de la création de l'album");
        console.log(err);
        res.redirect('/albums/create');
    }
   
   
}

export default {
    createAlbumForm,
    createAlbum,
    listAlbums,
    showAlbum,
    updateAlbum,
};