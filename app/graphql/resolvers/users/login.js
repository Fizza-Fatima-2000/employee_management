const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = process.env;
const { GraphQLError } = require("graphql");

const login = {
  Mutation: {
        //----------------------------------------------- User(LOGIN)-----------------------------------------------------//
    // FOR LOGIN USING EMAIL AND PASSWORD
    async Login(root, {input}) {
      try {
        const email = input.email;
        console.log(input.email , "email");
        
        const password = input.password;
        const forLogin = await prisma.user_credentials.findUnique({
          where: {
            email: email,
          },
           
        //   select :{
        //     email : true,
        //   }
        });
        console.log(forLogin , "orrr");
        
        if (!(password || email)) {
          throw new Error("All input is required");
        }
        if ((await bcrypt.compare(password, forLogin.password)) == true) {
         const token =  jwt.sign(
            {
              id: forLogin.id,
              email: forLogin.email,
              role_id: forLogin.role_id,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1d",
            }
        )
          return {  token:token}
        } else {
          throw new GraphQLError("Wrong password..!", {
            extensions: {
              StatusCode: 401,
            },
          });
        }
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Login Failed " + "Please Try Again....!", {
          extensions: {
            StatusCode: 401,
          },
        });
      }
    },
  },
};
module.exports = login;
