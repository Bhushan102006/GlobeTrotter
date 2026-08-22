function validateRegister(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    if (!firstName || !firstName.trim()) {
        return res.status(400).json({
            message: 'firstName is missing'
        });
    }

    if (!lastName || !lastName.trim()) {
        return res.status(400).json({
            message: 'lastName is missing'
        });
    }

    if (!email || !email.trim()) {
        return res.status(400).json({
            message: 'email is missing'
        });
    }

    if (!password) {
        return res.status(400).json({
            message: 'password is missing'
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'password must be at least 8 characters long'
        });
    }

    next();
}

module.exports = { validateRegister };
