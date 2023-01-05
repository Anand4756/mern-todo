const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
const token = req.headers.authorization.split(' ')[1];
jwt.verify(token, "randomtoken", (err, user)=>{
if(err){
	res.status(404).json(err);
}else{
	req.user = user;
	next();
}
})
}



module.exports = {
	isAuthenticated,
}