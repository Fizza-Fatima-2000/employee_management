const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { GraphQLError } = require("graphql");
const { AuthForBoth } = require("../../middleWare");
const user = require("../../typeDefs/usersTypeDefs");

const specificemployee = {
  Query: {
        //----------------------------------------------- User(Employee)-----------------------------------------------------//
    // FOR GET  Employee Details(USING TOKEN)
    getspecificemployee: async (root, args, { req }) => {
      try {
        const authHeader = req.headers?.authorization;

        if (!authHeader) {
          throw new GraphQLError("Authorization token is required", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
        const forvalidtoken = AuthForBoth(authHeader);
        console.log(forvalidtoken, "id", forvalidtoken.id);

        const forGetspecificemployee = await prisma.user_credentials.findUnique(
          {
            where: { id: forvalidtoken.id },
            include: {
              users: true,
            },
          }
        );

        if (!forGetspecificemployee) {
          throw new GraphQLError("User credentials not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        const details = {
          name: forGetspecificemployee.users[0].name,
          subject: forGetspecificemployee.users[0].subject,
          attendance: forGetspecificemployee.users[0].attendance,
          class: forGetspecificemployee.users[0].class,
          age: forGetspecificemployee.users[0].age,
        };
        return { user: forGetspecificemployee, details: details };
      } catch (error) {
        console.log(error);
        throw new GraphQLError("failed to get employee details ", {
          extensions: {
            StatusCode: 500,
            code: "Failed ",
          },
        });
      }
    },
  },
};
module.exports = specificemployee;
