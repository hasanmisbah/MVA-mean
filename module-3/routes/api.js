var express = require('express');
var router = express.Router();


router.route('/posts')
    .get(function(req,res){
        res.send({
            message : 'TODO return All Posts'
        })
    })
    .post(function(req,res){
        res.send({
            message: 'TODO Create a Posts'
        })
    });

module.exports = router;