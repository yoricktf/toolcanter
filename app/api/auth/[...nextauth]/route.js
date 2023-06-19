import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
const authOptions = NextAuth({
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
