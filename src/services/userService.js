import mysql from "mysql2";
import bcrypt from "bcryptjs";

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

// setting hash salt
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    // hash password
    return bcrypt.hashSync(userPassword, salt);
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    // insert a new user
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',[email, hashPass, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}

const getUserList = () => {
        let users = [];
        // get list user
        connection.query(
            'SELECT * FROM users',
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                }
            }
        );
}

module.exports = {createNewUser, getUserList};