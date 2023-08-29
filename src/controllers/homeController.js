import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
    // return res.send("Hello World from controller!");
    const name = "Ares7760";
    return res.render("home.ejs", { name });
}

const handleUserPage = (req, res) => {
    // model => get data from database
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    //let checkPassword = bcrypt.compareSync(password, hashPassword); // true
    userService.createNewUser(email, password, username);

    return res.send("handleCreateNewUser ");
}

module.exports = { handleHelloWorld, handleUserPage, handleCreateNewUser };