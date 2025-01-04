// This function takes an asynchronous function (func) as an argument
module.exports = func => {
    // It returns a new function that takes req, res, and next as arguments
    return (req, res, next) => {
        // Call the original function (func) with req, res, and next
        // If the function returns a promise and it rejects, catch the error and pass it to next
        func(req, res, next).catch(next);
    };
};

// Why catch? In Express, when you pass an error to next, it automatically forwards the error to the error-handling middleware. This means you don't need to write try...catch in every route.