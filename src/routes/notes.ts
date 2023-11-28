import express from 'express';

import Note from '../models/note/infraestructure/noteSchema';

//add notes
export const NotesRouter = express
.Router()
.get('/notes/add', (rep, res) => {
    res.render('notes/new-note');
})
.post('/notes/new-note', (req, res) => {
    let {title, description} = req.body;
    let errors = [
        !title ? {text: "Pleace write a title"} : [],
        !description ? {text: "pleace write a description"} : []
    ].flat();

    errors.length > 0 
    ? res.render('notes/new-note', { errors, title, description }) 
    : new Note({ title, description }).save().then(() => res.redirect('/notes'));

})
.get('/notes', async (req, res) => {
    let notes = await Note.find().sort({date: "desc"}).lean();

    res.render('notes/all-notes', { notes: notes });
})
.get('/notes/update/:id', async (req, res) => {
    let note = await Note.findById(req.params.id).lean();

    res.render('notes/update-note', { note });
})
.post('/notes/update/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/notes");
})
.get('/notes/toggleDone/:id', async (req, res) => {
    let note = await Note.findById(req.params.id);

    if (!note) return res.redirect('/')

    note.done = !note.done;

    await note.save()

    res.redirect("/notes");
})
.get('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);

    res.redirect("/notes");
})