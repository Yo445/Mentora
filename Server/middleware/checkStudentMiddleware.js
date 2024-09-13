const checkStudentMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a student');
    }
}

export default checkStudentMiddleware;