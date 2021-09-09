const express = require('express');
const connection = require('../database/connection');
const { connect } = require('../database/connection');
const route = express.Router();


route.get('/',function(req,res)
{
   const statusLogin = req.session.statusLogin;
   const username = req.session.username;
   const userId = req.session.idUser;
   const qeryCollection = `SELECT * FROM collections_tb WHERE user_id = ${userId}`;
   connection.query(qeryCollection,function(err,result)
   {
        const data = result;
        res.render('index',{statusLogin,username,data});
   });
   
});

// Route Register
route.post('/register',function(req,res)
{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const queryValidasi = `SELECT * FROM users_tb WHERE username = "${username}" AND email = "${email}"`;
    connection.query(queryValidasi,function(err,result)
    {
        if(result.length >= 1)
        {
            req.session.message = {
                icon : 'error',
                title : "Username Atau Email Telah Terdaftar"
            }
            res.redirect('/');
        }
        else 
        {
            const queryInsert = `INSERT INTO users_tb (username,email,password) VALUES ("${username}","${email}","${password}")`;
            connection.query(queryInsert,function(err,result)
            {
                req.session.message = {
                    icon : 'success',
                    title : "Berhasil Registrasi"
                }
                res.redirect('/');
            });
        }
    });
});

// Route Login
route.post('/login',function(req,res)
{
    const email = req.body.email;
    const password = req.body.password;

    const query = `SELECT * FROM users_tb WHERE email = "${email}" AND password = "${password}"`;
    connection.query(query,function(err,result)
    {
        if(result.length >= 1)
        {
            req.session.statusLogin = true;
            req.session.idUser = result[0].id;
            req.session.username = result[0].username;
            req.session.email = result[0].email;

            req.session.message = {
                icon : 'success',
                title : `Selamat Datang ${req.session.username = result[0].username}`
            }
            res.redirect('/');
        }
        else 
        {
            req.session.message = {
                icon : 'error',
                title : "Cek Kembail Email Dan Password Anda"
            }
            res.redirect('/');
        }
    });
});

// Route Logout
route.get('/logout',function(req,res)
{
    req.session.destroy();
    res.redirect('/');
});

// Route Collection
route.post('/addCollection',function(req,res)
{
    const userId = req.session.idUser;
    const collection = req.body.collection;
    const query = `INSERT INTO collections_tb (name,user_id) VALUES ("${collection}",${userId})`;
    connection.query(query,function(err,result)
    {
        console.log(err);
        req.session.message = {
            icon : 'success',
            title : "Data Berhasil Di Simpan"
        }
        res.redirect('/');
    });
});
route.post('/updateCollection/:id',function(req,res)
{
    const id = req.params.id;
    const collection = req.body.collection;
    const query = `UPDATE collections_tb SET name = "${collection}" WHERE id = ${id}`;
    connection.query(query,function(err,result)
    {
        console.log(err);
        req.session.message = {
            icon : 'success',
            title : "Data Berhasil Di Perbarui"
        }
        res.redirect('/');
    });
});
route.get('/deleteCollection/:id',function(req,res)
{
    const id = req.params.id;
    const query = `DELETE FROM collections_tb WHERE id = ${id}`;
    connection.query(query,function(err,result)
    {
        console.log(err);
        req.session.message = {
            icon : 'success',
            title : "Data Berhasil Di Hapus"
        }
        res.redirect('/');
    });
});

// Route Task
route.get('/task/:id',function(req,res)
{
    const id = req.params.id;
    
    const query =  `SELECT * FROM task_tb WHERE collections_id = ${id}`;
    connection.query(query,function(err,result)
    {
        const data = result;

        const queryCol =  `SELECT * FROM collections_tb WHERE id = ${id}`;
        connection.query(queryCol,function(err,result)
        {
            const dataCollections = result;
            res.render('task',{data,dataCollections});
        });
    });
});
route.post('/add-task',function(req,res)
{
    const collections_id = req.body.collections_id;
    const name = req.body.name;

    const query = `INSERT INTO task_tb (name,is_done,collections_id) VALUES ("${name}",1,${collections_id})`;
    connection.query(query,function(err,result)
    {
        res.redirect('/');
    });
});
route.get('/deleteTask/:id',function(req,res)
{
    const id = req.params.id;
    const query = `DELETE FROM task_tb WHERE id = ${id}`;
    connection.query(query,function(err,result)
    {
        res.redirect('/');
    });
});


module.exports = route;