module.exports = func => { // take a func
    return (req,res,next) => {
        func(req, res,next).catch(next); //call that func.It returns a promise if something wrong catch it
    }

} // why catch ? In Express, when you pass an error to next, it automatically forwards the error to the error-handling middleware. This means you don't need to write try...catch in every route.