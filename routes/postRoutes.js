const router = require("express").Router();
const { createPost, updatePost, deletePost, getPosts } = require("../controllers/postControllers");
const {isLoggedIn} = require("../middlewares/isLoggedIn")


router.route("/post/create").post(isLoggedIn,createPost);
router.route("/post/update").put(isLoggedIn,updatePost);
router.route("/post/delete/:id").delete(isLoggedIn,deletePost)
router.route("/post/get").get(getPosts);

module.exports = router;