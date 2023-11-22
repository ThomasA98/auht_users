const router = require('express').Router();
const Note = require('../models/note/infraestructure/noteSchema');


//add notes
router.get('/notes/add', (rep, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', (req, res) => {
    let {title, description} = req.body;
    let errors = [
        !title ? {text: "Pleace write a title"} : [],
        !description ? {text: "pleace write a description"} : []
    ].flat();

    errors.length > 0 
    ? res.render('notes/new-note', { errors, title, description }) 
    : new Note({ title, description }).save().then(() => res.redirect('/notes'));

});

//list notes in app
router.get('/notes', async (req, res) => {
    let notes = await Note.find().sort({date: "desc"}).lean();

    res.render('notes/all-notes', { notes: notes });
});

//update note
router.get('/notes/update/:id', async (req, res) => {
    let note = await Note.findById(req.params.id).lean();

    res.render('notes/update-note', { note });
});

router.post('/notes/update/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/notes");
});

//change to done 
router.get('/notes/toggleDone/:id', async (req, res) => {
    let note = await Note.findById(req.params.id);

    note.done = !note.done;

    await note.save()

    res.redirect("/notes");
});

//delete note
router.get('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);

    res.redirect("/notes");
});

module.exports = router;
