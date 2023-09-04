var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
  const { userName, password } = req.body;
  if (userName == null || password == null) {
    return res.send({success: false, message: "invalid params"});
  }
  /// check user ...


  res.send({success: true, message: "asdasdsa"})
})

module.exports = router;
