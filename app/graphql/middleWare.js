const jwt = require("jsonwebtoken");
const config = process.env;
const { GraphQLError } = require("graphql");
const { ROLE } = require("../config/constant");

const isAuth = (token) => {
  if (!token) {
    console.log("A token is required for authentication");
    throw new GraphQLError("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    if (decoded.role_id !== ROLE.admin) {
      throw new GraphQLError("Sorry, Access Denied", {
        extensions: { code: "FORBIDDEN" },
      });
    }
    return decoded;
  } catch (err) {
    console.log(err);
    throw new GraphQLError(err.message);
  }
};

const AuthForBoth = (token) => {
  if (!token) {
    console.log("A token is required for authentication");
    throw new GraphQLError("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    if (decoded) {
      return decoded;
    } else {
      console.log("Sorry Access Denied");
      throw new GraphQLError("Sorry Access Denied");
    }
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Invalid Token");
  }
};

module.exports = { isAuth, AuthForBoth };
