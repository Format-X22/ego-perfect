var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.send('root');
});

module.exports = router;