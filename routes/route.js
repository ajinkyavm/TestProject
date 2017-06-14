/**
 * Created by Swami on 05/06/17.
 */
const express = require('express');
const router = express.Router();


router.get('/getUser',  require('./getUsers'));
router.post('/setUser',  require('./setUser'));

router.post('/setThemeRefrencemarker',  require('./setThemeRefrencemarker'));
router.post('/getThemeRefrencemarker',  require('./getThemeRefrencemarker'));
router.post('/setTheme',  require('./setTheme'));
router.get('/getTheme',  require('./getTheme'));

router.post('/setDeadline',  require('./setDeadline'));
router.post('/setAnnualDeadline',  require('./setAnnualDeadline'));

router.get('/login',  require('./getUsers'));

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res){
    var err = new Error('Not Found');
    res.status(404);
    res.json(-1,`Requested API not found ${err}`);

});


module.exports = router;