const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], "jwtSecret");
        req.user = decoded;
        const userIdFromParams = req.body._id; 
        console.log(decoded)
        if (req.user.id !== userIdFromParams) {
            return res.status(403).json({ error: "Token does not match the user" });
        }
        next();
    } catch (error) {
        
        res.status(401).json({ error: "Invalid token" });
    }
};
