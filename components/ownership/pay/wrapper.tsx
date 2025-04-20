"use client"

import { useGetPaymentRequest } from "@/hooks/cashramp/useGetPaymentRequest"
import { Cashramp } from "./cashramp"
import { useEffect, useState } from "react"
import { initiateHostedPayment } from "@/utils/cashramp/initiateHostedPayment"
import { usePrivy } from "@privy-io/react-auth"

export function Wrapper({ reference }: { reference: string }) {

    const {user} = usePrivy();

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    
    const privyUserMetadata = user?.customMetadata
    console.log(privyUserMetadata)

    const [openRamp, setOpenRamp] = useState(false)
    const [hostedLink, setHostedLink] = useState("")


    const { paymentRequest } = useGetPaymentRequest(reference)
    console.log(paymentRequest)

    
    useEffect(() => {
        (async () => {
            if(paymentRequest){
                setHostedLink(paymentRequest?.hostedLink)
                setOpenRamp(true)
            }
            if(paymentRequest === null){
                const initiatedHostedPayment =  await initiateHostedPayment(
                    63,
                    "GH",
                    user!.email!.address!,
                    reference,
                    privyUserMetadata?.firstname as string,
                    privyUserMetadata?.lastname as string
                )
                setHostedLink(initiatedHostedPayment.hostedLink)
                setOpenRamp(true)
            }
        })()
    }, [paymentRequest, reference, user])

    return (
        <div>
            {openRamp && <Cashramp hostedLink={hostedLink} />}
        </div>
    )
}
