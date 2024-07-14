
const express=require("express");

const jwt = require("jsonwebtoken");
const {jwtOptions} = require('../config/jwtoptions');
const bcrypt = require('bcrypt');

const db = require('../models'); // Import the User model

function router(app){

    app.get('/api/v1/users', async(req,res)=>{

        try {

        const users = await db.Users.findAll();

        const userlist = users.map(user=>{

            return{
                f_name:user.f_name,
                l_name:user.l_name,
                status:user.status,
                email:user.Email,
                contact:user.contact,
                gender:user.gender,
                country:user.country,
                subCounty:user.subCounty,
                type:user.type,

            }

        })

        return res.status(200).json(userlist);


        }  catch(error){
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal server error' });

        }
    })
  
    app.post('/api/v1/register', async (req, res) => {
        try {
          const { f_name, l_name, Email, type, contact,status, county,country,subCounty,gender, pwd } = req.body;
      
          // Check if the user with the provided email already exists
          const existingUser = await db.Users.findOne({ where: { Email } });
          if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists', status :'409' });
          }
      
          // Hash the password before saving
          const hashedPassword = bcrypt.hashSync(pwd,
             bcrypt.genSaltSync(8));

             console.log(hashedPassword);
      
          // Create the user
          const newUser = await db.Users.create({
            f_name,
            l_name,
            Email,  
            contact,
            gender,
            country,
            county,
            status,
            subCounty,
            type,
            pwd: hashedPassword
          });
      
          return res.status(201).json(newUser);
        } catch (error) {
          console.error('Error during registration:', error);
          return res.status(500).json({ error: 'Registration failed' });
        }
      });
      

      app.put('/api/v1/update/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const { f_name, l_name, contact, status, county, country, subCounty, gender } = req.body;
    
            // Check if the user with the provided user_id exists
            const user = await db.Users.findOne({ where: { Userid: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found', status: '404' });
            }       
            const updateFields = {
                f_name,
                l_name,
                contact,
                status,
                county,
                country,
                subCounty,
                gender
            };
    

            await user.update(updateFields);
    
            return res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            console.error('Error during user update:', error);
            return res.status(500).json({ error: 'Update failed' });
        }
    });
    
    
      app.post('/api/v1/login', async (req, res) => {
        try {
            const { Email, pwd } = req.body;
    
            if (Email && pwd) {
                const user = await db.Users.findOne({ where: { Email } });
                if (!user) {
                    return res.status(401).json({ message: 'No such user found' });
                }
    
                bcrypt.compare(pwd, user.pwd, (err, result) => {
                    if (err) {
                        return res.status(403).json({ message: 'Incorrect password', status:'403' });
                    }
                    if (result) {
                        const payload = { user };
                        const token = jwt.sign(payload, jwtOptions.secretOrKey);
                        return res.status(200).json({ message: 'Login success', token });
                    } else {
                        return res.status(403).json({ message: 'Incorrect password' });
                    }
                });
            } else {
                return res.status(400).json({ message: 'Bad request' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Login failed' });
        }
    });


    app.post('/api/v1/assignrole',async(req,res)=>{

        try{
            const{RoleId,UserId } =req.body;
            const roleAssigned = await db.UserRoles.create({
                RoleId,
                UserId
            })
            return res.status(201).json(roleAssigned);

        }
        catch(error){
          console.error('Error occured during role assignment :', error);
          return res.status(500).json({ error: 'creation  failed' , status:"8000"});


        }


    })

    app.put('/api/v1/change-password/:user_id', async (req, res) => {
        try {
            const { user_id } = req.params;
            const { current_password, new_password, confirm_password } = req.body;
            const user = await db.Users.findOne({ where: { UserId: user_id } });
            if (!user) {
                return res.status(404).json({ error: 'User not found', status: '404' });
            }
    
            const isPasswordValid = bcrypt.compareSync(current_password, user.pwd);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Current password is incorrect', status: '401' });
            }
    
            if (new_password !== confirm_password) {
                return res.status(400).json({ error: 'New password and confirm password do not match', status: '400' });
            }
            const hashedNewPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(8));
            await user.update({ pwd: hashedNewPassword });
    
            return res.status(200).json({ message: 'Password changed successfully', status:'200' });
        } catch (error) {
            console.error('Error during password change:', error);
            return res.status(500).json({ error: 'Password change failed' });
        }
    });
    
  
          

}




module.exports= router;
