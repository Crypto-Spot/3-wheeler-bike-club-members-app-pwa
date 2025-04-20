
import { Card } from "../ui/card";
import { Button } from "../ui/button";
//import { usePrivy } from "@privy-io/react-auth";
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

export function Invoice ({ memberInvoiceAttestation, currencyRate,/* afterPaymentSuccess,*/ loadingInvoicePayment, setLoadingInvoicePayment, invoicePaymentLoadingId, setInvoicePaymentLoadingId }: InvoiceProps) {
    

    //const {user} = usePrivy();
    console.log(currencyRate?.currency)

    const { attestation } = useGetAttestationData( memberInvoiceAttestation.memberInvoiceAttestationID )
    console.log(attestation)
    
    const { memberInvoiceAttestationData } = useDecodeMemberInvoiceAttestationData( attestation?.data )
    console.log(memberInvoiceAttestationData)

    
    
    
    

    const payMembershipDues = () => {
        setInvoicePaymentLoadingId(memberInvoiceAttestation._id)
        setLoadingInvoicePayment(true)
        
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