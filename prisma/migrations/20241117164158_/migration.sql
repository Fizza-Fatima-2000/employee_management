-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_credential_Id" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_credential_Id_fkey" FOREIGN KEY ("user_credential_Id") REFERENCES "user_credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
