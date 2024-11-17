const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { GraphQLError } = require("graphql");
const { isAuth } = require("../../middleWare");

const allUserEmployee = {
  Query: {
       //----------------------------------------------- User(Employee)-----------------------------------------------------//
    // FOR GET ALL Employee Details(ADMIN ONLY)
    getAllUseremployee: async (_, { filters }, { req }) => {
      try {
        console.log(req, "req");
    
        const authHeader = req.headers?.authorization;
        console.log(authHeader, "authHeader");
    
        if (!authHeader) {
          throw new GraphQLError("Authorization token is required", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
    
        const onlyforadmin = isAuth(authHeader)
        console.log(onlyforadmin, "onlyforadmin");
    
        const users = await prisma.user.findMany({
          where: {
            ...(filters?.id && { id: filters.id }),
            ...(filters?.name && {
              name: { contains: filters.name, mode: "insensitive" },
            }),
            ...(filters?.age && { age: filters.age }),
            ...(filters?.class && {
              class: { contains: filters.class, mode: "insensitive" },
            }),
            ...(filters?.subject && {
              subject: { contains: filters.subject, mode: "insensitive" },
            }),
          },
         
        });
    
        return { user: users };
      } catch (error) {
        console.error(error, "error");
    
        throw new GraphQLError(error.message, {
          extensions: {
            StatusCode: 500,
            code: "FAILED_TO_FETCH_EMPLOYEES",
          },
        });
      }
    }
  },
};

module.exports = allUserEmployee;
