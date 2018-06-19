var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var auth = require('./auth');
var User = require('./models/user');
var Post = require('./models/post');
var app = express();

app.use(cors());
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/posts/:id', async (req,res) => {
    var author = req.params.id
    var posts = await Post.find({author})
    res.send(posts)
})

app.post('/post', (req,res) => {
    var postData = req.body
    postData.author = '5b286203454fd02d9079e675'

    var post = new Post(postData)

    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({message: 'saving post error'})
        }

        res.sendStatus(200)
    })
});

app.get('/users', async (req, res) => {
    try {
        var users = await  User.find({}, '-__v -pwd');
        res.send(users);
    } catch (e) {
        res.status(500).send({message: "error in finding"})
    }
});

app.get('/profile/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})



mongoose.connect('mongodb://naveen:naveensharma12@ds163630.mlab.com:63630/nsitstudent', (err) => {
    if (!err)
        console.log('connected to mongo')
})
app.use('/auth',auth);

app.listen(3000, () => {
    console.log('server is started ')
})