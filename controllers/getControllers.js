const primaryObject = require('../original/users_original.json')
const getAllUsers = (req, res) => {
    res.send(primaryObject);
    console.log("Respondiendo a GET USERS");
};

module.exports = {
    getAllUsers
}