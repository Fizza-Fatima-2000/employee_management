const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const { GraphQLError } = require("graphql");
const { ROLE } = require("../../../config/constant");
const bcrypt = require("bcrypt");

const createEmployee = {
  Mutation: {
    //----------------------------------------------- User(Employee)-----------------------------------------------------//
    // FOR ADD Employee Details
    async addemployee(_, { input }) {
      try {
        console.log(input , "input");
        
        const encryptedPassword = await bcrypt.hash(input.password, 10);
        const user_credentials = await prisma.user_credentials.create({
          data: {
            email: input.email,
            password: encryptedPassword,
            role_id: ROLE.employee,
            deleted: false,
            token: "",
          },
        });
console.log(user_credentials, "user_credentials");

        const create_employee = await prisma.user.create({
          data: {
            name: input.name,
            age: input.age,
            class: input.class,
            subject: input.subject,
            attendance: input.attendance,
            user_credential_Id: user_credentials.id,
          },
        });
        return create_employee;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add employee");
      }
    },
  },
};
module.exports = createEmployee;
