const mongoose = require('mongoose');
const Project = require('./../models/Project');
require("dotenv").config()

const projectsInfo=[
    {
        name:"portfolio",
        subtitle:"My presentation card",
        techs:["react", "redux", "styled", "nodejs", "express"],
        mainText:"Portfolio under development, focused on clean code and best practices. Currently the best reference for my web development skills. Contact me for the link.\n \n       React, Redux, Styled-Components",
        img:"./Images/Projects/port.png",
        media:["pc"],
        gitHub:{
            frontend:"https://github.com/ifrancesalcantara/Portfolio",
            backend:"https://github.com/ifrancesalcantara/Portfolio-Backend",
            repository:""
        }
    },{
        name:"paintapop",
        subtitle:"Get some cool looking figures",
        techs:["react", "mongo", "css3", "nodejs", "express"],
        mainText:"A mobile application that allows users to trade painting services. The user can browse and post cards showing thier style, connecting with the card's creator with a chat.",
        img:"./Images/Projects/paintapop.png",
        link:"https://paintapop.herokuapp.com/",
        media:["mobile", "tablet"],
        gitHub:{
            frontend:"https://github.com/ifrancesalcantara/Project-3-frontend",
            backend:"https://github.com/ifrancesalcantara/Maquetepinto-backend",
            repository:""
        }
    },{
        name:"bombard",
        subtitle:"Escape from your audience",
        techs:["javascript", "css3", "html5", "express"],
        mainText:"A maze scape game based off Bomberman, where the user has to exit the town avoiding being bitten by angry dogs and making their way by destroying blocks. In the PvP mode, both players fight to death with the help of random cards. Developed with HTML canvas and Javascript.",
        img:"./Images/Projects/bombard.png",
        link:"https://ifrancesalcantara.github.io/Bombard/",
        media:["pc"],
        gitHub:{
            frontend:"",
            backend:"",
            //WHEN COMBINED
            repository:"https://github.com/ifrancesalcantara/Bombard"
        }
    },{
        name:"hoodie",
        subtitle:"Map-based notepad",
        techs:["css3", "sass", "nodejs", "handlebar", "gmaps", "express"],
        mainText:"A mobile application that allows the users to post comments on a map. These comments can be made public or private, allowing the user to interact with other user comments replying or liking them.",
        img:"./Images/Projects/hoodie.png",
        link:"https://hoodie-app.herokuapp.com/",
        media:["mobile"],
        gitHub:{
            frontend:"",
            backend:"",
            //WHEN COMBINED
            repository:"https://github.com/ifrancesalcantara/Project2"
        }
    }
]

//CONNECT DATABASE

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        return Project.create(projectsInfo);
    })
    .then((newProjects) => {
        console.log('Inserted Maps:', newProjects.length);
        mongoose.connection.close()
    })
    .catch((err) => console.log(err))