import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";
import db from "../../models";

// setting hash salt
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    // hash password
    return bcrypt.hashSync(userPassword, salt);
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    // insert a new user
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.log(error);
    }
    // connection.query(
    //     'INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
    //     function (err, results, fields) {
    //         console.log(results); // results contains rows returned by server
    //         console.log(fields); // fields contains extra meta data about results, if available
    //     }
    // );
}

const getUserList = async () => {
    let user = [];
    // create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // get list user
    // connection.query(
    //     'SELECT * FROM user',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return user;
    //         }

    //         user = results;
    //         return user;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows;
    } catch (error) {
        console.log("error>>>", error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // insert a new user
    try {
        const [rows, fields] =
            await connection.execute('DELETE FROM user WHERE id = ?', [id]);
            return rows;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // get user infor
    try {
        const [rows, fields] =
            await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
            return rows;
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id, email, username) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // update user infor
    try {
        const [rows, fields] =
            await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?',
                [email, username, id]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createNewUser, getUserList, deleteUser, getUserById, updateUser };