import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const login = async (credentials) => {
  try {
    // API ENDPOINT: Conectar a la DB y chequear que el usuario exista, en caso de existir traerlo

    const userFromDB = { username: "prueba", password: "prueba" };

    if (!userFromDB) return { error: "User does not exist" };

    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );

    // if (!isPasswordCorrect) throw new Error("Password does not match");
    if (userFromDB.password !== credentials.password)
      return { error: "User does not exist" };
    // throw new Error("Passwords do not match!");

    return userFromDB;
  } catch (err) {
    console.log(err);
  }
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user, account, profile);
      return true;
    },
  },
});
