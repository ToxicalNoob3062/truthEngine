import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account.provider === "google") {
        // Look up the user based on the email provided by the Google account
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.email, // Assuming email uniquely identifies users
          },
        });

        if (existingUser) {
          // User found, you can update their information if needed
          // For example, if you want to update the user's name
          await prisma.user.update({
            where: {
              id: existingUser.id,
            },
            data: {
              name: profile.name,
            },
          });
        } else {
          // User not found, you can create a new user in the database
          const newUser = await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              // Set other user properties as needed
            },
          });

          console.log("New user created:", newUser);
        }

        return Promise.resolve(true); // Return true to allow the sign-in.
      }
      return Promise.resolve(false); // Return false to deny the sign-in.
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(Options);
export { handler as GET, handler as POST };
