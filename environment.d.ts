import { string } from "zod"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_PRIVY_APP_ID: string
            PRIVY_APP_SECRET: string
            PRIVATE_KEY: `0x${string}`
            WHEELER_API_KEY: string
            ATTEST_PRIVATE_KEY: `0x${string}`
            BASE_NODE_API_KEY: string
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}