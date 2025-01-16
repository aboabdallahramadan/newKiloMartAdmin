import "next-auth"
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      language: number
    }
    accessToken: string
  }
  interface User {
    id: string
    email: string
    name: string
    role: string
    language: number
    token: string
  }
}