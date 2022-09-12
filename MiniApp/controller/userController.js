const userModel = require('../models/userModel')

module.exports.getUsers = async function getUsers(req, res) {
    const id = req.id
    const user = await userModel.findById(id)
    if (user) {
        res.json({
            usr: user
        })
    } else {
        res.json({
            msg: "user not found"
        })
    }

}

module.exports.updateUser = async function updateUser(req, res) {
    try {
        const id = req.params.id
        const user = await userModel.findById(id)
        const dataTobeUpdated = req.body
        if (user) {
            let keys = []
            for (let key in dataTobeUpdated) {
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataTobeUpdated[keys[i]]
            }
            const updatedData = await user.save()
            res.json({
                msg: "user updated",
                updated: user
            })
        } else {
            res.json({
                msg: "user not found"
            })
        }
    } catch (err) {
        res.json({
            msg: err
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        const id = req.params.id
        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            res.json({
                msg: 'user not found'
            })
        }
        res.json({
            msg: "data deleted successfully"
        })
    } catch (err) {
        res.json({
            msg: err
        })
    }
}

module.exports.getallUsers = async function getallUsers(req, res) {
    try {
        const users = await userModel.find()
        if (users) {
            res.json({
                msg: "user found ",
                allusers: users
            })
        } else {
            res.json({
                msg: "usr not created"
            })
        }
    } catch (err) {
        res.json({
            msg: err
        })
    }
}

module.exports.updateProfileImage = function updateProfileImage(req,res){
    res.json({
        msg : "uploaded successfully"
    })
}