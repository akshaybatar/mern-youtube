const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(err => { next(err); });
    }
}

export { asyncHandler };

// second way to create a function that will be called when the server is ready

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         console.error(error);
//         res.status(error.code || 500).json({ success: false, message: error.message });
//     }
// }