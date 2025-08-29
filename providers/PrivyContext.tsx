"use client"


import { PrivyProvider } from "@privy-io/react-auth"
import type { ReactNode } from "react"
import { base, celo, celoAlfajores } from "viem/chains"
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
                loginMethods: ["email"],
                /* Replace this with your desired appearance configuration */
                appearance: {
                    theme: "dark",
                    accentColor: "#F5CD1D",
                    logo: "https://finance.3wb.club/icons/logo.png",
                },
                defaultChain: celo,
                supportedChains: [celo],
                embeddedWallets: {
                    createOnLogin: "all-users",
                    noPromptOnSignature: true
                },
            }}
        >
            <SmartWalletsProvider
                config={{
                    paymasterContext: {
                      mode: "SPONSORED",
                      calculateGasLimits: true,
                      expiryDuration: 300,
                      sponsorshipInfo: {
                        webhookData: {},
                        smartAccountInfo: {
                          name: "BICONOMY",
                          version: "2.0.0",
                        },
                      },
                    }
                }}
            >
                {children}
            </SmartWalletsProvider>
        </PrivyProvider>
    )
}
