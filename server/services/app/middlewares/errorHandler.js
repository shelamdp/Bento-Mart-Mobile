function errorHandler(err, req, res, next) {
    console.log(err)
    let message = "Internal Server Error"
    let status = 500
    switch (err.name) {
        case "NOTFOUND":
            message = "Data not found!"
            status = 404
            break;
    }

    res.status(status).json({message})
}


module.exports = errorHandler