const express = require("express")
const userRouter = express.Router();
const multer = require("multer")
const { updateProfileImage,getUsers, updateUser, deleteUser, getallUsers } = require("../controller/userController");
const { signup, login, protectRoute, isAuthorised, forgetPassword, resetPassword, logout, } = require("../controller/authController")


//user's options
userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser)

//signup user
userRouter
    .route("/signup")
    .post(signup)

//login user
userRouter
    .route("/login")
    .post(login)

userRouter
    .route("/forgetPassword")
    .post(forgetPassword)

userRouter
    .route("/resetPassword/:token")
    .post(resetPassword)

// multer for fileupload
// upload-> storage,filter
const multerStorage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'Public/images')
    },
    filename: function (req, res, cb) {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an Image! plz upload an image'))
    }
}

const upload = multer({
    Storage: multerStorage,
    fileFilter: filter
})
userRouter.post("/ProfileImage", upload.single('photo', updateProfileImage))

userRouter.get("/ProfileImage", (req, res) => {
    res.send("F:/New folder (3)/MyFirstProject/multer.html")
})
//user's profile 
userRouter.use(protectRoute)
userRouter
    .route("/userProfile")
    .get(getUsers)



// for admin purpose
userRouter.use(isAuthorised(['admin']))
userRouter
    .route("/")
    .get(getallUsers)

// logout
userRouter
    .route("/logout")
    .get(logout)


module.exports = userRouter