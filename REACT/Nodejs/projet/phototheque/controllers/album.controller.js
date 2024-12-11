import Album from '../models/album.model.js';
import catchAsync from '../helpers/catchAsync.js';
import path from 'path';
import fs from 'fs';

export const listAlbums = catchAsync(async (req, res) => {
    const albums = await Album.find();
    res.render('albums', {
        title: 'Liste des albums',
        albums,
    });
});
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
export const updateAlbum = async (req, res) => {
    const idAlbum = req.params.id.trim();
    const album = await Album.findById(idAlbum);
    

    console.log(req.files);

    if(!req?.files?.file){
        req.flash('error', "Aucun fichier n'a été envoyé");
        return res.redirect(`/albums/${idAlbum}`);
    }
    const imageType = req.files.file;
    const uploadDir = path.join('public/uploads',idAlbum);
    const localpath = path.join(uploadDir, imageType.name);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    

    if(imageType.mimetype !== 'image/jpeg' && imageType.mimetype !== 'image/png'){
        req.flash('error', "Le fichier doit être une image au format jpg ou png");
        return res.redirect(`/albums/${idAlbum}`);
    }

    await req.files.file.mv(localpath)

    album.image.push(imageType.name);

    await album.save();

    res.redirect(`/albums/${idAlbum}`);
};

export const showAlbum = async (req, res) => {
    const { id } = req.params;
    const album = await Album.findById(id);
    res.render('album', {
        title:"mon album"+ album.title,
        album,
        errors: req.flash('error'),
    });
    console.log(album);
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

export const deleteImage = async (req, res) => {
    const { id, imageIndex } = req.params;
    const album = await Album.findById(id); // Récupération de l'album avec mongoose
    const image = album.image[imageIndex];
    if (!image) {
        return res.redirect(`/albums/${id}`);
    }

    album.image.splice(imageIndex, 1);
    const imagePath = path.join('public/uploads', id, image);
    fs.unlinkSync(imagePath); // Suppression du fichier

    await album.save(); // Mise à jour de l'album
    res.redirect(`/albums/${id}`);
}

export const deleteAlbum = async (req, res) => {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);

    const albumDir = path.join('public/uploads', id);

    fs.rm(albumDir, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error("Erreur de suppression du dossier :", err);
            return res.status(500).send("Erreur de suppression de l'album.");
        }
        console.log('Album supprimé');
        res.redirect('/');
    });
    // Suppression du dossier de l'album 

   
}

export default {
    createAlbumForm,
    createAlbum,
    listAlbums,
    showAlbum,
    updateAlbum,
    deleteImage,
    deleteAlbum,
};