"use client"


import { PrivyProvider } from "@privy-io/react-auth"
import type { ReactNode } from "react"
import { base } from "viem/chains"
import {SmartWalletsProvider} from '@privy-io/react-auth/smart-wallets'


type Props = {
    children: ReactNode,
}

export function PrivyContext ({ children }: Props) {

    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
            config={{
                /* Replace this with your desired login methods */
                loginMethods: ["sms"],
                /* Replace this with your desired appearance configuration */
                appearance: {
                    theme: "dark",
                    accentColor: "#E2C837",
                    logo: "https://i.ibb.co/mttPXst/susuclub.png",
                    showWalletLoginFirst: true,

                },
                defaultChain: base,
                supportedChains: [base],
                embeddedWallets: {
                    createOnLogin: "all-users",
                    noPromptOnSignature: true
                },     
            }}
        >
            <SmartWalletsProvider>{children}</SmartWalletsProvider>
        </PrivyProvider>
    )
}
