const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { GraphQLError } = require("graphql");
const { AuthForBoth } = require("../../middleWare");



const updateEmployee= {
Mutation: {
        //----------------------------------------------- User(Employee)-----------------------------------------------------//
    // FOR UPDATE  Employee Details(UING TOKEN)
    async updateemployee(_, { input }, {req}) {
        try {
            const authHeader = req.headers?.authorization;
            console.log(authHeader, "authHeader");
    
            if (!authHeader) {
              throw new GraphQLError("Authorization token is required", {
                extensions: { code: "UNAUTHENTICATED" },
              });
            }
            const onlyforadmin = AuthForBoth(authHeader);
            console.log(onlyforadmin, "onlyforadmin");
    
          const existingEmployee = await prisma.user_credentials.findUnique({
            where: { id: onlyforadmin.id },
          });
  
          if (!existingEmployee) {
            throw new GraphQLError("Employee not found", {
              extensions: {
                statusCode: 404,
                code: "EMPLOYEE_NOT_FOUND",
              },
            });
          }
  
          const updatedEmployee = await prisma.user.updateMany({
            where: { user_credential_Id :existingEmployee.id },
            data: input,
          });
  
          return updatedEmployee;
        } catch (error) {
          console.error(error);
          throw new GraphQLError("Failed to update employee", {
            extensions: {
              statusCode: 400,
              code: "UPDATE_EMPLOYEE_FAILED",
            },
          });
        }
      },
    },
}

module.exports = updateEmployee