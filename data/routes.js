const express = require('express') // We are using express and thats how we b
const Hubs = require('./db') //We call our main function piece Hubs. this hold all our helper functions/logic

const router = express.Router()

router.get('/api/posts', (req,res) =>{
    console.log(req.query) //Returns whatever is in the request(req) in this case it
    //should be an empty string
    Hubs.find(req.query) // Calls our main function file to use the find method
    // to look for our db posts
    .then(data =>{      // this is the promise that is executed for a ziggs main :)
        res.status(200).json(data) // take response and return status 200 and data
        })
    .catch(error => {
            // log error to database  
            console.log(error);
            res.status(500).json({
              message: 'Error retrieving the hubs',
            });
    });
})
router.get('/api/posts/:id', (req,res) =>{
    console.log(req.params.id) //Returns whatever is in the request(req) in this case it
    //should be an id
    Hubs.findById(req.params.id) // Calls our main function file to use the findbyId method
    // to look for our db posts that match that id
    .then(data =>{      // this is the promise that is executed for a ziggs main :)
        if (data.length) {
            res.status(200).json(data); // Returns 
        } 
        else 
        {
            res.status(404).json({ message: 'Hub not found' });
        }
})
    .catch(error => {
            // log error to database  
            console.log(error);
            res.status(500).json({
              message: 'Wrong',
            });
    });

})
router.get('/api/posts/:id/comments', (req,res) =>{
    console.log(req.params.id) //Returns whatever is in the request(req) in this case it
    //should be an id
    Hubs.findPostComments(req.params.id) // Calls our main function file to use the find method
    // to look for our db posts
    .then(data =>{      // this is the promise that is executed for a ziggs main :)
        if (data.length) {
            const temp = data.map((comment)=>{
                return comment.text
            })
            res.status(200).json(temp);
        } 
        else {
            res.status(404).json({ message: 'Hub not found' });
        }
})
    .catch(error => {
            // log error to database  
            console.log(error);
            res.status(500).json({
              message: 'Wrong',
            });
    });
})
router.post('/api/posts', (req,res) =>{
    Hubs.insert(req.body) // Calls our main function file to use the find method
    // to look for our db posts
    .then(data =>{      // this is the promise that is executed for a ziggs main :)
            res.status(201).json(data);
        })
    .catch(error => {
            // log error to database  
            console.log(error);
            res.status(500).json({
              message: 'Wrong post',
            });
    });
})

router.post('/api/posts/:id/comments', (req,res) =>{
    console.log(req.params.id, "this is req body", req.body)
    const forSteve= {post_id:req.params.id, ...req.body}
    
    Hubs.insertComment(forSteve)
        .then(data =>{      // this is the promise that is executed for a ziggs main :)
            res.status(201).json(data);
        })
        .catch(error => {
      console.log(error.message, error.stack) // you need both of these pieces
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      })
    })
})

router.delete('/api/posts/:id' , (req,res) =>{
    Hubs.remove(req.params.id)
        .then(data =>{
            if(data.length){
                console.log(data)
                res.status(200).json(data)
            }
            else
            {
                res.status(404).json({ message: 'Not to delete found' });
            }
        })
        .catch(error =>{
        console.log(error.message, error.stack) // you need both of these pieces
        res.status(404).json({
            message: error.message,
            stack: error.stack,
        })
    })
})

router.put('/api/posts/:id', (req, res) => {
    
    Hubs.update(req.params.id, req.body)
        .then(data =>{    
            if(data){
                res.status(200).json(data);
                console.log(data)
            }
            else
            {
                res.status(404).json({ message: 'Not to update found' });
            }
        })
        .catch(error =>{
            console.log(error.message, error.stack) // you need both of these pieces
            res.status(404).json({
                message: error.message,
                stack: error.stack,
            })
    })
})

// router.put('/api/posts/:id', (req, res) => {
//     const postChanges= req.body;
//     Hubs.update(req.params.id, postChanges)
//     .then(edit => {
//         if(edit) {
//             res.status(200).json(postChanges);
//             console.log(postChanges)
//             //console logging edit returns 1
//         } else {
//             res.status(404).json({
//                 message: 'The post could not be found'
//             })
//         }
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(500).json({
//             message: 'Error updating the posts'
//         })
//     })
// })



// router.delete('/api/hubs/:id', (req, res) => {
//   Hubs.remove(req.params.id)
//   .then(count => {
//     if (count > 0) {
//       res.status(200).json({ message: 'The hub has been nuked' });
//     } else {
//       res.status(404).json({ message: 'The hub could not be found' });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error removing the hub',
//     });
//   });
// });

// router.put('/api/hubs/:id', (req, res) => {
//   const changes = req.body;
//   Hubs.update(req.params.id, changes)
//   .then(hub => {
//     if (hub) {
//       res.status(200).json(hub);
//     } else {
//       res.status(404).json({ message: 'The hub could not be found' });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error updating the hub',
//     });
//   });
// });

// // add an endpoint that returns all the messages for a hub
// router.get('/api/hubs/:id/messages', (req, res) => {
//   // we need to find a good function inside the model
//   Hubs.findHubMessages(req.params.id)
//     .then(data => {
//       // throw new Error('that was arghhhhh!!!!!!')
//       console.log(data)
//       if (!data.length) {
//         res.status(404).json({
//           message: 'No messages, OR No hub with id ' + req.params.id
//         })
//       } else {
//         res.status(200).json(data)
//       }
//     })
//     .catch(error => {
//       console.log(error.message, error.stack)
//       res.status(500).json({
//         // message: 'that was an error of some sort'
//         message: error.message,
//         stack: error.stack,
//       })
//     })
// })
// // add an endpoint for adding new message to a hub [POST] { sender, text } :id
// router.post('/api/hubs/:id/messages', (req, res) => {
//   const newMessage = { hub_id: req.params.id, ...req.body }
//   Hubs.addMessage(newMessage)
//     .then(data => {
//       console.log(data)
//       res.status(201).json(data)
//     })
//     .catch(error => {
//       // console.log(error) // this is not gonna go well
//       console.log(error.message, error.stack)
//       res.status(500).json({
//         // message: 'that was an error of some sort'
//         message: error.message,
//         stack: error.stack,
//       })
//     })
// })
module.exports= router