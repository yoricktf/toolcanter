// import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/utils/mongoDBAdapter.js';

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          userName: profile.login,
          githubId: profile.id,
          image: profile.avatar_url,
          admin: false,
          favorites: [],
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.githubId = user.githubId;
        session.user.email = user.email;
        session.user.admin = user.admin;
        session.user.favorites = user.favorites;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
};
