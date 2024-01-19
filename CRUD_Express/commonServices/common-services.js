const logs = require("../model/log");
const jwt = require("jsonwebtoken");
const aes256 = require("aes256");

const encryptDataWithKey = (key, data) => {
    try {
      return aes256.encrypt(key, data);
    } catch (error) {
      console.log("common Service", error);
      return false;
    }
  };

const decryptDataWithKey = (key, data) => {
    return aes256.decrypt(key, data);
  };

const comparePassword = (dbHashedPassword, password) => {
    var decryptedPassword = decryptDataWithKey(
      process.env.AES_KEY,
      dbHashedPassword
    );
    if (decryptedPassword === password) {
      return true;
    }
    return false;
  };

const saveLog = async (data) => {
    let saveThisLog = new logs({
        ...data,
    });
    await saveThisLog.save(); // save to db
};

const verifyJWT = (token) => {
    return jwt.verify(token, `${process.env.JWT_KEY}`, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
};

const JWToken = (expiry, payLoad) => {
    return jwt.sign(payLoad, `${process.env.JWT_KEY}`, {
      expiresIn: expiry.toString(),
    });
  };

  const loggedInStatus = async (data) => {
    let AuthToken;
      let payLoad = {
        userId: data._id,
        contact: data.contact,
        email: data.email,
      };

      AuthToken = JWToken(
        process.env.JWTLoginExpiresIn,
        payLoad);
    
    return AuthToken;
  };

module.exports = { 
    encryptDataWithKey,
    decryptDataWithKey,
    comparePassword,
    saveLog,
    verifyJWT,
    loggedInStatus
};
