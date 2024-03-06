const { User } = require("../models/userModel");

// Middleware to check if user is allowed to mine
exports.statuscheckMiningPermission = async (req, res, next) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    console.log(user)
    if (user.status) {
            const currentTime = new Date();
            const lastMiningTime = user.lastMiningTime || currentTime;

            // Calculate time difference in milliseconds
            const timeDifference = currentTime - lastMiningTime;
            const hoursDifference = timeDifference / (1000 * 60 * 60);

            // If less than 24 hours have passed, user cannot mine
            if (hoursDifference < 24) {
                const remainingHours = 24 - hoursDifference;
                console.log(remainingHours)
                return res.status(403).json({ message: `Cannot mine yet. Try again after ${remainingHours.toFixed(2)} hours.` });
            }
        }
    next();
};
