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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            message: 'email is invalid'
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

function validateLogin(req, res, next) {
    const { email, password } = req.body;

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

    next();
}

function validateForgotPassword(req, res, next) {
    const { email } = req.body;

    if (!email || !email.trim()) {
        return res.status(400).json({
            message: 'email is missing'
        });
    }

    next();
}

function validateResetPassword(req, res, next) {
    const { email, token, newPassword } = req.body;

    if (!email || !email.trim()) {
        return res.status(400).json({
            message: 'email is missing'
        });
    }

    if (!token || !token.trim()) {
        return res.status(400).json({
            message: 'reset token is missing'
        });
    }

    if (!newPassword) {
        return res.status(400).json({
            message: 'newPassword is missing'
        });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({
            message: 'newPassword must be at least 8 characters long'
        });
    }

    next();
}

module.exports = {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
};
