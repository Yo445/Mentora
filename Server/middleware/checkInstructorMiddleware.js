
const checkInstructorMiddleware = (req, res, next) => {
        if (req.user && req.user.role === 'instructor') {
            next();
        } else {
            res.status(401);
            throw new Error('Not authorized as an instructor');
        }
}

export default checkInstructorMiddleware;