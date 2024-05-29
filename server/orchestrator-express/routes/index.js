const router = require("express").Router()
const Controller = require("../controllers")

router.get("/menus", Controller.getAllMenu)
router.post("/menus", Controller.addMenu)
router.get("/menus/:id", Controller.getDetailMenu)
router.put("/menus/:id", Controller.updateMenu)
router.delete("/menus/:id", Controller.destroyMenu)
router.get("/categories", Controller.getAllCategories)
router.post("/users", Controller.addUser)
router.get("/users", Controller.getAllUser)
router.get("/users/:id", Controller.getUser)
router.delete("/users/:id", Controller.destroyUser)

module.exports = router