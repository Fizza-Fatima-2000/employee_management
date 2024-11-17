const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { GraphQLError } = require("graphql");
const { isAuth } = require("../../middleWare");

const allpaginatedemployee = {
  Query: {
        //----------------------------------------------- User(Employee)-----------------------------------------------------//
    // FOR GET ALL Employee Details(ADMIN ONLY)
    getallpaginatedemployee: async (_, { page = 1, limit = 10 }, { req }) => {
      try {
        const authHeader = req.headers?.authorization;
        console.log(authHeader, "authHeader");

        if (!authHeader) {
          throw new GraphQLError("Authorization token is required", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
        const onlyforadmin = isAuth(authHeader);
        console.log(onlyforadmin, "onlyforadmin");

        const skip = (page - 1) * limit;
        const user = await prisma.user.findMany({
          skip: skip,
          take: limit,
        });

        const totalEmployees = await prisma.user.count();

        return {
          user,
          totalEmployees,
          totalPages: Math.ceil(totalEmployees / limit),
          currentPage: page,
        };
      } catch (error) {
        console.error(error);
        throw new GraphQLError(error.message, {
          extensions: {
            StatusCode: 500,
            code: "FAILED_TO_FETCH_EMPLOYEES",
          },
        });
      }
    },
  },
};

module.exports = allpaginatedemployee;
