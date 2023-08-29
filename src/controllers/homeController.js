import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

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

    // simple query
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',[email, password, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );


    return res.send("handleCreateNewUser ");
}

module.exports = { handleHelloWorld, handleUserPage, handleCreateNewUser };