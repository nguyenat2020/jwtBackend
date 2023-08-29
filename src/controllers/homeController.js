import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
    // return res.send("Hello World from controller!");
    const name = "Ares7760";
    return res.render("home.ejs", { name });
}

const handleUserPage = async (req, res) => {
    // model => get data from database
    let userList = await userService.getUserList();
    await userService.deleteUser(2);
    return res.render("user.ejs", {userList});
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    //let checkPassword = bcrypt.compareSync(password, hashPassword); // true
    userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    console.log(">>>check delete Id : ", req.params.id);

    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

module.exports = { handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser };