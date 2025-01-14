"use client"

import { usePrivy } from "@privy-io/react-auth";
import { Authorized } from "./authorized";
import { Unauthorized } from "./unauthorized";



export function Wrapper() {
  const { ready, authenticated } = usePrivy()
  return (
    <>
      {
        !ready 
        ?(
            <>
                <main className="flex">
                    <p>loading....</p>
                </main>
            </>
        )
        :(
          <>
                <main className="flex">
                  {
                    authenticated
                    ? <Authorized/>
                    : <Unauthorized/>
                  }
                </main>
            </>
            
        )
      }
    </>
  );
}