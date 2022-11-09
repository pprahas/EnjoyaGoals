const User = require("../models/UserModel");
const express = require("express");
const invLink = require("../models/InvLinkModel");
const rooms = require("../models/RoomModel");


const router = express.Router();

router.use(express.json());

// router.post("/create_link", async (req, res) => {
    
//     // //if link exists then return lin
//     // const linkk = await InvLink.findOne({});

//     // if (linkk) {
//     //     //get the link from the database
//     //     const link = await InvLink.findOne({});
//     //     res.json(link);
//     //     return res.send({ status: "error", message: "Link already exists" });
//     // }
//     //call createTokenInv from CreateToken.js

//     const link = InvCreateToken.activation(
//     //     {
//     //     creator: req.body.creator,
//     //     maxUses: req.body.maxUses,
//     //     expiresAt: req.body.expiresAt,
//     // }
//     );

//     const invLink = new invLinkSchema({
//         link: link,
//         creator: req.body.creator,
//         createdAt: new Date(),
//         expiresAt: 1,
//         maxUses: 1
//     });

//     try {
//         const savedLink = await invLink.save();
//         res.json(savedLink);
//     } catch (error) {

//         res.json({ message: error });
//     }

// });




router.post("/edit_link", async (req, res) => {
    
        const link = req.body.link; //NOTE CHECK LATER it should already have link 
                                    //cuz already clicked create link
        const creator = req.body.creator;
        const maxUses = req.body.maxUses;
        const currentUses = req.body.currentUses;
        const expiresAt = req.body.expiresAt;
        
        
        try {
            const user = await User.findOne({ username: creator });
        
            if (!user) {
            res.status(403).send({ message: "User does not exist." });
            } else {
                //update link

                const updatedLink = await invLink.updateOne(
                    { link: link },
                    {
                        $set: {
                            maxUses: maxUses,
                            expiresAt: expiresAt
                        },
                    }
                );
                updatedLink.save().then((link) => {
                    res.json(updatedLink);
                    res.status(200).send({ message: "Link Edited." });
                    // res.json(updatedLink);
                });
            
            }
        } catch (error) {
            res.json({ message: error });
        }
    });



//check link for validity

router.post("/check_link", async (req, res) => {
    
        const link = req.body.link;
        const creator = req.body.creator;
        const maxUses = req.body.maxUses;
        const currentUses = req.body.currentUses;
        const expiresAt = req.body.expiresAt;
        const createdAt = req.body.createdAt;

        try {
            const user = await User.findOne({ username: creator });
        
            if (!user) {
            res.status(403).send({ message: "The creater of the link doesnt exist." });
            } else {
                //check link
                // const link = await InvLink.findOne({ link: link });
                //iterate through all the rooms and match the token with the room
                //if the room is found then return the room
                //if the room is not found then return error

                const findRes = await rooms.find( { _id: link } );

                console.log(findRes);
                
                // for(let i = 0; i < findRes.length; i++){
                //     if(findRes[i].invLink == link){ //InvLink ???
                //         res.json(findRes[i]);
                //         return res.status(200).send({ message: "Link Found." });
                //     }
                // }
                     
                
                res.send(findRes);
                

                if (!link) {
                    res.status(403).send({ message: "Link does not exist." });
                } else {

                    if(findRes) {
                    
                        res.status(200).send({ findRes
                            // , message: "Link Found." 
                        });

                        // //add user to the room
                        // const room = await Room.findOne({ _id: link });
                        // const user = await User.findOne({ username:  });

                        // room.users.push(user);
                        // room.save();
                        // res.status(200).send({ message: "User added to room." });

                    } else {
                        res.status(403).send({ message: "Link does not exist." });
                    }

                    //check if link is expired
                    // if (link.expiresAt < new Date()) {//delete link
                        
                    //     res.status(403).send({ message: "Link has expired." });
                    // } else {
                    //     //check if link has reached max uses
                    //     if (link.currentUses >= link.maxUses) {
                    //         res.status(403).send({ message: "Link has reached max uses." });
                    //     } else {
                    //         //check if link is valid
                    //         const validLink = await InvLink.updateOne(
                    //             { link: link },
                    //             {
                    //                 $set: {
                    //                     currentUses: currentUses + 1,
                    //                 },
                    //             }
                    //         );
                    //         validLink.save().then((link) => {
                    //             res.status(200).send({ message: "Link is valid." });
                    //             res.json(validLink);
                    //         });
                    //     }
                    // }
                }
            }
        } catch (error) {
            res.send({ status: "error" });
        }
    });
    

    //delete link by user
    router.post("/delete_link", async (req, res) => {
        
            const link = req.body.link;
            const creator = req.body.creator;
            const maxUses = req.body.maxUses;
            const currentUses = req.body.currentUses;
            const expiresAt = req.body.expiresAt;
            const createdAt = req.body.createdAt;
        
            try {
                const user = await User.findOne({ username: creator });         ///MAYBE WE DONT NEED USER  
            
                if (!user) {
                res.status(403).send({ message: "User does not exist." });
                } else {
                    //delete link
                    const deletedLink = await InvLink.deleteOne({ link: link });
                    deletedLink.save().then((link) => {
                        res.status(200).send({ message: "Link Deleted." });
                        res.json(deletedLink);
                    });
                }
            } catch (error) {
                res.send({ status: "error" });
            }
        }
    );

module.exports = router;

