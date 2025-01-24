
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { postMemberReceiptAttestationAction } from "@/app/actions/attestation/postMemberReceiptAttestationAction";
import { deconstructMemberReceiptAttestationData } from "@/utils/attest/member/receipt/deconstructMemberAttestationData";
import { attestMemberReceipt } from "@/utils/attest/member/receipt/attestMemberReceipt";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { useDecodeMemberInvoiceAttestationData } from "@/hooks/attestations/useDecodeMemberInvoiceAttestationData";
import { OffchainMemberInvoiceAttestation } from "@/hooks/attestations/useGetMemberInvoiceAttestations";
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";
import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

interface InvoiceProps {
    address: string | undefined
    memberInvoiceAttestation: OffchainMemberInvoiceAttestation
    currencyRate: CurrencyRate
    getBackMemberInvoiceAttestations: () => Promise<void>
    getBackMemberReceiptAttestations: () => Promise<void>
}

export function Invoice ({ address, memberInvoiceAttestation, currencyRate, getBackMemberInvoiceAttestations, getBackMemberReceiptAttestations }: InvoiceProps) {
    const [loading, setLoading] = useState(false)

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
        const recepient: string[] = []
        recepient.push(address!)
        //calulate score
        const score = 7
        //deconstruct attestation data
        const deconstructedAttestationData = await deconstructMemberReceiptAttestationData(memberInvoiceAttestation.memberInvoiceAttestationID, recepient, memberInvoiceAttestation.amount, currencyRate?.currency, memberInvoiceAttestation.week, score )
        const receipt = await attestMemberReceipt(deconstructedAttestationData)
        if (receipt) {
            await postMemberReceiptAttestationAction(address!, memberInvoiceAttestation.memberInvoiceAttestationID, receipt?.attestationId, memberInvoiceAttestation.amount, currencyRate?.currency, memberInvoiceAttestation.week, 7 )
        }
        await getBackMemberInvoiceAttestations()
        await getBackMemberReceiptAttestations()
        setLoading(false)
    };
      
    const onClose = () => {
        // implementation for whatever you want to do when the Paystack dialog closed.
        console.log('closed');
        setLoading(false)
    };

    const initPaystackPayment = usePaystackPayment(config);

    const payMembershipDues = () => {
        setLoading(true)
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
                    disabled={loading}
                    className="max-w-[10rem]"
                    onClick={()=>{
                        payMembershipDues()
                    }}
                >
                    {
                        loading
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