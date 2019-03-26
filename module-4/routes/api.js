var express = require('express');
var router = express.Router();

router.use(function(req,res,next){

    // Continue to Next Middleware or request Handle
    if(req.method === 'get'){
        return next();
    }

    if(!req.isAuthenticated()){
        // user isn't authenticated. redirect to login Pages
       return res.redirect('/#login');
    }
    return next();
});


router.route('/posts')
    .get(function(req,res){
        res.send({
            message : 'TODO return All Posts'
        });
    })
    .post(function(req,res){
        res.send({
            message: 'TODO Create a Posts'
        });
    });
router.route('/posts/:id')
    // get post using id
    .get(function(req,res){
        res.send({
            message : 'TODO Get a single Post '+ req.params.id
        });
    })
    //update Existing post using id
    .put(function(req,res){
        res.send({
            message: 'TODO modify a single Post ' + req.params.id
        });
    })
    // Delete Post Using ID
    .delete(function(req,res){
        res.send({
            message: 'TODO delete a single Post ' + req.params.id
        });
    });

module.exports = router;