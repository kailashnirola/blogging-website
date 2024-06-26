import express from 'express';
var vlogs = [];
const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

app.get('/', (req, res) => {
    res.render("index.ejs", { vlogs: vlogs });
});

app.get('/add', (req, res) => {
    res.render("add.ejs");
});

app.post('/submit', (req, res) => {
    var newvlog = {
        title: req.body.title,
        content: req.body.content
    }
    vlogs.push(newvlog);
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    var vlogId = parseInt(req.params.id);
    vlogs.splice(vlogId, 1);
    res.redirect('/');
});

app.get("/edit/:id", (req, res) => {
    var vlogId = parseInt(req.params.id);
    res.render("edit.ejs", { vlog: vlogs[vlogId], vlogId: vlogId });
});

app.post("/edit/:id", (req, res) => {
    var id = parseInt(req.params.id);
    vlogs[id].title = req.body.title;
    vlogs[id].content = req.body.content;
    res.redirect('/');
});
