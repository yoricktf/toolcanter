import NextAuth from 'next-auth/next';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GithubProvider from 'next-auth/providers/github';
import clientPromise from '../../../../utils/mongoDBAdapter.js';
const authOptions = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

// export default NextAuth(authOptions);
export { authOptions as GET, authOptions as POST };
