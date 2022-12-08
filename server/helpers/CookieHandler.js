const jwt = require("jsonwebtoken");

// when imported, use this function as the condition of an if
// checkCookieRes = checkCookie(req, res);
// if (!checkCookieRes) { res.status(401).send("Access denied"); }
// else { console.log(checkCookieRes); }
function checkCookie(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const checkCookie2 = (req, res, next) => {
  // const token = req.cookies.token;

  // if (token) {
  // 	jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
  // 		if (err) {
  // 			return res.status(401).json({
  // 				isLoggedIn: false,
  // 				message: "Access denied, authentication failed."
  // 			});
  // 		}
  // 		req.user = {};
  // 		req.user.id = decoded.id;
  // 		req.user.username = decoded.username;
  // 		// console.log("cookie verified successfully");
  // 		next();
  // 	});
  // } else {
  // 	res.status(401).json({
  // 		isLoggedIn: false,
  // 		message: "Access denied, you have no cookies."
  // 	})
  // }
  next();
};

module.exports = { checkCookie2 };
