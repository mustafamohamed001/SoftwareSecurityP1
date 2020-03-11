const sqlitecontroller = require('../controllers/sqlcontroller.js');
    express = require('express'), 
    router = express.Router()

    router.route('/getusers').get(sqlitecontroller.getUsers);
    router.route('/performance').get(sqlitecontroller.performance); 
  
module.exports = router;