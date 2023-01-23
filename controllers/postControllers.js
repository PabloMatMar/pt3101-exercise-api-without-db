const primaryObject = require('../original/users_original.json')
const { v4: uuidv4 } = require('uuid');
uuidv4();

const postUser = (req, res) => {
    function createUsers() {
        const { email, firstName, lastName, phone, imagen, username, address, vehicles, favouritesFood } = req.body
        const newUser = {
            id: uuidv4(),
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone || "",
            img: imagen || "",
            username: username,
            address: address || {},
            vehicles: vehicles || [],
            favouritesFood: favouritesFood || [],
            deleted: false
        }
        if (email && firstName && lastName && username) {
            primaryObject.push(newUser)
            return (primaryObject)
        } else {
            return ("Se requieren campos")
        }
    }
    const data = createUsers()
    res.json(data)
    console.log("Respondiendo a POST USERS")
}

module.exports = {
    postUser
}