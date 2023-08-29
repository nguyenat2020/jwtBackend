import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";


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
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}

const getUserList = async () => {
    let users = [];
    // create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // get list user
    // connection.query(
    //     'SELECT * FROM users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }

    //         users = results;
    //         return users;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.log("error>>>", error);
    }


}

module.exports = { createNewUser, getUserList };