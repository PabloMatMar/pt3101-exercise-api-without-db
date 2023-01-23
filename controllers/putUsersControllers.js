const primaryObject = require('../original/users_original.json')

const putUser = (req, res) => {
    let num = 0;
    for (let i = 0; i < primaryObject.length; i++) {
        const param = req.params.username;
        const { email, firstName, lastName, phone, img, username, address } = req.body;
        if (param === primaryObject[i].username.toString()) {
            primaryObject[i].email = email;
            primaryObject[i].firstName = firstName;
            primaryObject[i].lastName = lastName;
            primaryObject[i].phone = phone;
            primaryObject[i].img = img;
            primaryObject[i].username = username;
            primaryObject[i].address = address;
            res.json(primaryObject[i])
            console.log("Respondiendo a PUT USERNAME")
            num = 1;

        }
        if (i === primaryObject.length - 1 && num === 0) {
            res.json("Usuario a actualizar no encontrado")
            console.log("Respuesta vacia a PUT USERNAME ")
        }
    }
}

module.exports = {
    putUser
}