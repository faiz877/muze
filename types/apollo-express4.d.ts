declare module "@apollo/server/express4" {
  import type { ApolloServer } from "@apollo/server"
  import type { RequestHandler } from "express"

  export function expressMiddleware(
    server: ApolloServer<any>,
    options?: any
  ): RequestHandler
}


