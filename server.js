const express = require('express');
const app = express();


app.use(express.json());

const database = {
    users:[
        {
            id: '090' , 
            name: 'JP',
            email:'youdontcare@gmail.com',
            password: 'idc',
            entries: 0,
            joined: new Date()
        },
        {
            id: '900' , 
            name: 'PJ',
            email:'youcare@gmail.com',
            password: 'idrc',
            entries: 0,
            joined: new Date()
        }
    ]
}


//Route
app.get('/', (req, res)=> {
    res.send(database.users)

})

app.post('/signin', (req, res) => {
  if(req.body.email ===  database.users[0].email &&
    req.body.password === database.users[0].password) {
        res.json('success');
    } else{
        res.status(404).json('error logging in')
    }
  
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body
    database.users.push({
        id: '000' , 
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
  })

  app.get('/profile/:id', (req, res)=> {
    const { id } = req.params;
    let found = false;
    //Loops through the DB
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
           return res.json(user);
        } 
    })
    if(!found) {
        res.status(404).json('no such user here')
    }
})

app.post('/image', (req, res)=> {
    const { id } = req.body;
    let found = false;
    //Loops through the DB
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++
           return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(400).json('No such user here')
    }
})



//Set port & function allows run after listen 
app.listen(3000, ()=> {
    console.log('Port running on 3000')
})


/*
/ res = this is working
/signin --. POST request  => Succes or Fail
/register --> POST =user 
/profile/:user.Id --> GET = user
/image --> PUT --> updated object
*/