const handleHelloWorld = (req, res) => {
    // return res.send("Hello World from controller!");
    const name = "Ares7760";
    return res.render("home.ejs", {name});
}

const handleUserPage = (req, res) => {
    // model => get data from database
    return res.render("user.ejs")
}

module.exports = {handleHelloWorld, handleUserPage};