const ExpressError = require("../middlewares/ApiError");
const { User } = require("../models/userModel");
const { wrapAsync } = require("../utils/wrapAsync");


exports.getUserDetail = wrapAsync(async (req, res, next) => {

    // Getting user detail from req.user
    const { _id, fullname, email, profileImage, levelAccount, coins } = req.user;

    res.status(200).json({
        success: true,
        user: _id, fullname, email, profileImage, levelAccount, coins
    })
})


exports.startMining = async (req, res, next) => {
    const userId = req.user._id; // Extract userID from req.user

    const currentTime = new Date();

    try {
        // Update the user's status and lastMiningTime in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { status: true, lastMiningTime: currentTime } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) return next(new ExpressError(404, "User Not Found"));

        // Set timeout to reset status after 24 hours
        setTimeout(async () => {
            await User.findByIdAndUpdate(userId, { $set: { status: false } });
            console.log('User status reset after 24 hours.');
        }, 24 * 60 * 60 * 1000);

        res.status(200).json({ success: true, message: 'Mining started. You can mine again after 24 hours.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

