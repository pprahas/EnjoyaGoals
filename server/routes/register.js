var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('registration page');
});

module.exports = router;