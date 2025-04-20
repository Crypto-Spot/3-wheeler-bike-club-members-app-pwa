import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
//import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { OffchainHirePurchaseInvoiceAttestation } from "@/hooks/attestations/useGetHirePurchaseInvoiceAttestations";
import { initiateHostedPayment } from "@/utils/cashramp/initiateHostedPayment";
import { useState } from "react";
import { Cashramp } from "./cashramp";
import { getCashrampAction } from "@/app/actions/cashramp/getCashrampAction";
import { postCashrampAction } from "@/app/actions/cashramp/postCashrampAction";


interface InvoiceProps {
    hirePurchaseInvoiceAttestation: OffchainHirePurchaseInvoiceAttestation
    currencyRate: CurrencyRate
    afterPaymentSuccess: (hirePurchaseInvoiceAttestation: OffchainHirePurchaseInvoiceAttestation) => Promise<void>
    loadingInvoicePayment: boolean
    setLoadingInvoicePayment: (loadingInvoicePayment: boolean) => void
    invoicePaymentLoadingId: string | null
    setInvoicePaymentLoadingId: (invoicePaymentLoadingId: string | null) => void
}

export function Invoice ({ hirePurchaseInvoiceAttestation, currencyRate, /*afterPaymentSuccess,*/ loadingInvoicePayment, setLoadingInvoicePayment, invoicePaymentLoadingId, setInvoicePaymentLoadingId }: InvoiceProps) {
    
    
    const {user} = usePrivy();
    console.log(currencyRate?.currency)

    const [openCashramp, setOpenCashramp] = useState(false)
    const [hostedLink, setHostedLink] = useState<string | null>(null)

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    //const { attestation } = useGetAttestationData( hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID )
    //console.log(attestation)
    
    //const { hirePurchaseInvoiceAttestationData } = useDecodeHirePurchaseInvoiceAttestationData( attestation?.data )
    //console.log(hirePurchaseInvoiceAttestationData)

    

    /*
    const config : PaystackProps = {
        reference: hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID,
        email: user!.email!.address!,
        amount: Math.ceil(Number(currencyRate?.rate) * hirePurchaseInvoiceAttestation.amount * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
        currency: currencyRate?.currency,
        channels: ['card', 'mobile_money'],
    }
    */
    
    

    const payOwnershipMicroPayment = async () => {
        setInvoicePaymentLoadingId(hirePurchaseInvoiceAttestation._id)
        setLoadingInvoicePayment(true)
        const cashramp = await getCashrampAction(hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID)
        if(cashramp){
            console.log(cashramp.hostedLink)
            setHostedLink(cashramp.hostedLink)
            setOpenCashramp(true)
        } else {
            const initiatedHostedPayment = await initiateHostedPayment(
                63,
                "GH",
                user!.email!.address!,
                hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID,
                user?.customMetadata?.firstName as string,
                user?.customMetadata?.lastName as string
            )
            console.log(initiatedHostedPayment)
            const postedCashramp = await postCashrampAction(
                smartWallet?.address as string,
                hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID,
                initiatedHostedPayment.hostedLink,
                initiatedHostedPayment.id,
                initiatedHostedPayment.status
            )
            if(postedCashramp){
                console.log(initiatedHostedPayment.hostedLink)
                setHostedLink(initiatedHostedPayment.hostedLink)
                setOpenCashramp(true)
            }
        }
    }
    

    return(
        <>
            <Card className="flex w-full justify-between">
                <div className="flex flex-col">
                    <p>Invoice ID: {hirePurchaseInvoiceAttestation.invoiceID}</p>
                    <p>Amount in USD:${hirePurchaseInvoiceAttestation?.amount}</p>
                    <p>Amount in {currencyRate?.currency}: {((Number(hirePurchaseInvoiceAttestation?.amount)) * Number(currencyRate?.rate)).toFixed(2)} {currencyRate?.currency}</p>
                    
                    <p>Due: {new Date(hirePurchaseInvoiceAttestation?.due).toLocaleDateString()}</p>
                    <div>
                        
                    </div>
                </div>
                <Button
                    disabled={loadingInvoicePayment}
                    className="w-36"
                    onClick={()=>{
                        payOwnershipMicroPayment()
                    }}
                >
                    {
                        loadingInvoicePayment && hirePurchaseInvoiceAttestation._id === invoicePaymentLoadingId
                        ? (
                            <>
                                <motion.div
                                initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                transition={{
                                    duration: 1, // Animation duration in seconds
                                    repeat: Infinity, // Infinity will make it rotate indefinitely
                                    ease: "linear", // Animation easing function (linear makes it constant speed)
                                }}
                            >
                                    <DotsHorizontalIcon/>
                                </motion.div>
                            </>
                        )
                        : (
                            <>
                                Pay
                            </>
                        )
                    }
                </Button>
            </Card>
            {openCashramp && <Cashramp setOpenRamp={setOpenCashramp} hostedLink={hostedLink!} />}
            
        </>
    )
}