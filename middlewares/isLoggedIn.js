const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please log in"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            }
        });

        next();
    } catch (error) {
        // Instead of throwing an error, you might want to handle it differently
        console.error("Error in isLoggedIn middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = isLoggedIn;
