// Middleware to handle async function

// Takes function as parameters
const asyncWrapper = (fn) => {
    // Invoking the async function immediately
    // req, res, next immediately accessed from the fn parameters
    return async(req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            // Passing to the next middleware 
            next(err)
        }
    }
};

module.exports = asyncWrapper;
