const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'TEST INDEX ROOT'
    })
});

module.exports = router;


