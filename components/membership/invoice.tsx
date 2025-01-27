
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { useDecodeMemberInvoiceAttestationData } from "@/hooks/attestations/useDecodeMemberInvoiceAttestationData";
import { OffchainMemberInvoiceAttestation } from "@/hooks/attestations/useGetMemberInvoiceAttestations";
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

interface InvoiceProps {
    memberInvoiceAttestation: OffchainMemberInvoiceAttestation
    currencyRate: CurrencyRate
    afterPaymentSuccess: (memberInvoiceAttestation: OffchainMemberInvoiceAttestation) => Promise<void>
    loadingInvoicePayment: boolean
    setLoadingInvoicePayment: (loadingInvoicePayment: boolean) => void
    invoicePaymentLoadingId: string | null
    setInvoicePaymentLoadingId: (invoicePaymentLoadingId: string | null) => void
}

export function Invoice ({ memberInvoiceAttestation, currencyRate, afterPaymentSuccess, loadingInvoicePayment, setLoadingInvoicePayment, invoicePaymentLoadingId, setInvoicePaymentLoadingId }: InvoiceProps) {
    

    const {user} = usePrivy();
    console.log(currencyRate?.currency)

    const { attestation } = useGetAttestationData( memberInvoiceAttestation.memberInvoiceAttestationID )
    console.log(attestation)
    
    const { memberInvoiceAttestationData } = useDecodeMemberInvoiceAttestationData( attestation?.data )
    console.log(memberInvoiceAttestationData)

    const config : PaystackProps = {
        reference: memberInvoiceAttestation.memberInvoiceAttestationID,
        email: user!.email!.address!,
        amount: Number(currencyRate?.rate) * memberInvoiceAttestation.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
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
        await afterPaymentSuccess(memberInvoiceAttestation)

        setLoadingInvoicePayment(false)
    };
      
    const onClose = () => {
        // implementation for whatever you want to do when the Paystack dialog closed.
        console.log('closed');
        setLoadingInvoicePayment(false)
    };

    const initPaystackPayment = usePaystackPayment(config);

    const payMembershipDues = () => {
        setInvoicePaymentLoadingId(memberInvoiceAttestation._id)
        setLoadingInvoicePayment(true)
        initPaystackPayment({onSuccess, onClose})
        
    }
    

    return(
        <>
            <Card className="flex w-full justify-between">
                <div className="flex flex-col">
                    <p>Amount: {Number(memberInvoiceAttestation?.amount)}</p>
                    <p>Week: {memberInvoiceAttestation?.week}</p>
                    <div>
                        
                    </div>
                </div>
                <Button
                    disabled={loadingInvoicePayment}
                    className="w-36"
                    onClick={()=>{
                        payMembershipDues()
                    }}
                >
                    {
                        loadingInvoicePayment && memberInvoiceAttestation._id === invoicePaymentLoadingId
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