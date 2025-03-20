
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { OffchainHirePurchaseInvoiceAttestation } from "@/hooks/attestations/useGetHirePurchaseInvoiceAttestations";

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
    

    const {user} = usePrivy();
    console.log(currencyRate?.currency)

    const { attestation } = useGetAttestationData( hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID )
    console.log(attestation)
    
    //const { hirePurchaseInvoiceAttestationData } = useDecodeHirePurchaseInvoiceAttestationData( attestation?.data )
    //console.log(hirePurchaseInvoiceAttestationData)

    const config : PaystackProps = {
        reference: hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID,
        email: user!.email!.address!,
        amount: Math.ceil(Number(currencyRate?.rate) * hirePurchaseInvoiceAttestation.amount * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
        currency: currencyRate?.currency,
        channels: ['card', 'mobile_money'],
    }
    
    interface referenceTypes {
        reference: string
    }
    const onSuccess = async (reference: referenceTypes) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log('reference', reference);
        //TODO: Implement the logic for the payment success
        await afterPaymentSuccess(hirePurchaseInvoiceAttestation)

        setLoadingInvoicePayment(false)
    };
      
    const onClose = () => {
        // implementation for whatever you want to do when the Paystack dialog closed.
        console.log('closed');
        setLoadingInvoicePayment(false)
    };

    const initPaystackPayment = usePaystackPayment(config);

    const payOwnershipMicroPayment = () => {
        setInvoicePaymentLoadingId(hirePurchaseInvoiceAttestation._id)
        setLoadingInvoicePayment(true)
        initPaystackPayment({onSuccess, onClose})
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
        </>
    )
}