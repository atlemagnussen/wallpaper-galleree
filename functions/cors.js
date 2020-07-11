const origins = [
    "localhost:8000",
    "http://wallpaper-galleree.web.app"
]
const defaultOrigin = "http://localhost:8000";
const add = (req, res) => {
    let origin = req.headers.origin ? req.headers.origin : defaultOrigin;
    console.log(`origin=${origin}`);
    if(origins.indexOf(origin) >= 0){
        res.header("Access-Control-Allow-Origin", origin);
    }   
    
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
};

exports.add = add;