const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const password = bcrypt.hash(req.body.password)

    const newUser = {
        username: req.body.username,
        name: req.body.name,
        password: password
    }

    
})

module.exports = router