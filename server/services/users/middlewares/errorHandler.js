function errorHandler(err, req, res, next) {
    let message = "Internal Server Error"
    let status = 500
    switch (err.name) {
        case "value":
            
            break;
    }

    res.status(status).json({message})
}


module.exports = errorHandler