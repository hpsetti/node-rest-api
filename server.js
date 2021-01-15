// const http = require('http');

const app = require("./app");


// const server = http.createServer(app);

// server.listen(port,() => {
//     console.log("server started!");
// })


const port = process.env.PORT || 3000;


app.listen(port,()=>{
    console.log("server started!");
});