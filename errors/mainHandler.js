const mainHandler = (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Server error',
            status: 999
        });
};

module.exports = mainHandler;