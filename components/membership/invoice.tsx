
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { postMemberReceiptAttestationAction } from "@/app/actions/attestation/postMemberReceiptAttestationAction";
import { deconstructMemberReceiptAttestationData } from "@/utils/attestation/member/receipt/deconstructMemberReceiptAttestationData";
import { attest } from "@/utils/attestation/attest";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { useDecodeMemberInvoiceAttestationData } from "@/hooks/attestations/useDecodeMemberInvoiceAttestationData";
import { OffchainMemberInvoiceAttestation } from "@/hooks/attestations/useGetMemberInvoiceAttestations";
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";
import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { calculateScore } from "@/utils/attestation/calculateScore";
import { deconstructMemberCreditScoreAttestationData } from "@/utils/attestation/member/creditScore/deconstructMemberCreditScoreAttestationData";
import { revoke } from "@/utils/attestation/revoke";
import { postMemberCreditScoreAttestationAction } from "@/app/actions/attestation/postMemberCreditScoreAttestationAction";
import { OffchainMemberCreditScoreAttestation } from "@/hooks/attestations/useGetMemberCreditScoreAttestation";

interface InvoiceProps {
    address: string | undefined
    memberInvoiceAttestation: OffchainMemberInvoiceAttestation
    memberCreditScoreAttestation: OffchainMemberCreditScoreAttestation
    currencyRate: CurrencyRate
    getBackMemberInvoiceAttestations: () => Promise<void>
    getBackMemberReceiptAttestations: () => Promise<void>
    getBackMemberCreditScoreAttestation: () => Promise<void>
}

export function Invoice ({ address, memberInvoiceAttestation, memberCreditScoreAttestation, currencyRate, getBackMemberInvoiceAttestations, getBackMemberReceiptAttestations, getBackMemberCreditScoreAttestation }: InvoiceProps) {
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
        const score = calculateScore(memberInvoiceAttestation.createdAt)
        //deconstruct attestation data
        const deconstructedAttestationData = await deconstructMemberReceiptAttestationData(memberInvoiceAttestation.memberInvoiceAttestationID, recepient, (Number(currencyRate?.rate) * memberInvoiceAttestation.amount * 100), currencyRate?.currency, memberInvoiceAttestation.week, score )
        const memberReceiptAttested = await attest(deconstructedAttestationData)
        if (memberReceiptAttested) {
            //post receipt attestation offchain
            await postMemberReceiptAttestationAction( address!, memberInvoiceAttestation.memberInvoiceAttestationID, memberReceiptAttested?.attestationId, (Number(currencyRate?.rate) * memberInvoiceAttestation.amount * 100), currencyRate?.currency, memberInvoiceAttestation.week, score )
            //revoke previous credit score attestation
            const revokeMemberCreditScoreAttestation = await revoke(memberCreditScoreAttestation.memberCreditScoreAttestationID)
            if (revokeMemberCreditScoreAttestation) {
                //create new credit score attestation
                const deconstructedCreditScoreAttestationData = await deconstructMemberCreditScoreAttestationData( recepient, (memberCreditScoreAttestation.score + score), (memberCreditScoreAttestation.paidWeeks + 1), memberCreditScoreAttestation.invoicedWeeks )
                const memberCreditScoreAttested = await attest(deconstructedCreditScoreAttestationData)
                if (memberCreditScoreAttested) {
                    await postMemberCreditScoreAttestationAction( address!, memberCreditScoreAttested?.attestationId, (memberCreditScoreAttestation.score + score), (memberCreditScoreAttestation.paidWeeks + 1) )
                }
            }
        }
        await getBackMemberInvoiceAttestations()
        await getBackMemberReceiptAttestations()
        await getBackMemberCreditScoreAttestation()

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
                    className="w-36"
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