const router = require("express").Router()
const UserController = require("../controllers/user")

router.get("/users", UserController.getAll)
router.get("/users/:id", UserController.getById)
router.post("/users", UserController.create)
router.delete("/users/:id", UserController.destroy)
router.put("/users/:id", UserController.update)

module.exports = router