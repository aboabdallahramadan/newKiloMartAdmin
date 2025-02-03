import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_MAIN}/api/user/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const result = await res.json()
        if (res.ok && result.status) {
          if(result.data.role === 'Admin') {
            return {
              id: result.data.userInfo.id as string,
              email: result.data.userInfo.email as string,
              name: result.data.adminInfo.displayName as string,
              role: result.data.role as string,
              token: result.data.token as string
            }
          }
          else {
            throw new Error('Only admin accounts are allowed')
          }
            
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role as string
        token.accessToken = user.token as string
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.role = token.role as string
        session.accessToken = token.accessToken as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }