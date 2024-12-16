import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Send user credentials to your ASP.NET API
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          // If sign-in is successful, return the user object
          if (res.ok && user) {
            return user; // `user` must include at least an `id` or `email` field
          }
          return null; // If authentication fails, return `null`
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JSON Web Tokens to manage sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to session
      session.user = token;
      return session;
    },
  },
});
