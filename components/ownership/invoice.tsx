import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
//import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { OffchainHirePurchaseInvoiceAttestation } from "@/hooks/attestations/useGetHirePurchaseInvoiceAttestations";
import { useGetPaymentRequest } from "@/hooks/cashramp/useGetPaymentRequest";
import { useRouter } from "next/navigation";

interface InvoiceProps {
    hirePurchaseInvoiceAttestation: OffchainHirePurchaseInvoiceAttestation
    currencyRate: CurrencyRate
    afterPaymentSuccess: (hirePurchaseInvoiceAttestation: OffchainHirePurchaseInvoiceAttestation) => Promise<void>
    loadingInvoicePayment: boolean
    setLoadingInvoicePayment: (loadingInvoicePayment: boolean) => void
    invoicePaymentLoadingId: string | null
    setInvoicePaymentLoadingId: (invoicePaymentLoadingId: string | null) => void
}

export function Invoice ({ hirePurchaseInvoiceAttestation, currencyRate, afterPaymentSuccess, loadingInvoicePayment, setLoadingInvoicePayment, invoicePaymentLoadingId, setInvoicePaymentLoadingId }: InvoiceProps) {


    const { paymentRequest } = useGetPaymentRequest(hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID)
    console.log(paymentRequest)

    const router = useRouter()
    
    const {user} = usePrivy();
    console.log(currencyRate?.currency)

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    //const { attestation } = useGetAttestationData( hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID )
    //console.log(attestation)
    
    //const { hirePurchaseInvoiceAttestationData } = useDecodeHirePurchaseInvoiceAttestationData( attestation?.data )
    //console.log(hirePurchaseInvoiceAttestationData)

    

    

    const payOwnershipMicroPayment = async () => {
        setInvoicePaymentLoadingId(hirePurchaseInvoiceAttestation._id)
        setLoadingInvoicePayment(true)
     
        
        router.push(`/ownership/${hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID}`)
        
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
                    disabled={loadingInvoicePayment || paymentRequest === undefined}
                    className="w-36"
                    onClick={()=>{
                        if(paymentRequest?.status === "completed"){
                            afterPaymentSuccess(hirePurchaseInvoiceAttestation)
                        } else {
                            payOwnershipMicroPayment()
                        }
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
                                
                                {
                                    paymentRequest === undefined
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
                                            {
                                                paymentRequest?.status === "completed"
                                                ? (
                                                    <>
                                                        Claim Receipt
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        Pay
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </Button>
            </Card>
            
        </>
    )
}