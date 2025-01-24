
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { postMemberReceiptAttestationAction } from "@/app/actions/attestation/postMemberReceiptAttestationAction";
import { deconstructAttestationData } from "@/utils/attest/deconstructAttestationData";
import { attestReceipt } from "@/utils/attest/attestReceipt";
import { usePrivy } from "@privy-io/react-auth";
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { useDecodeMemberInvoiceAttestationData } from "@/hooks/attestations/useDecodeMemberInvoiceAttestationData";
import { OffchainMemberInvoiceAttestation } from "@/hooks/attestations/useGetMemberInvoiceAttestations";
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData";

interface InvoiceProps {
    address: string | undefined
    memberInvoiceAttestation: OffchainMemberInvoiceAttestation
    currencyRate: CurrencyRate
}

export function Invoice ({ address, memberInvoiceAttestation, currencyRate }: InvoiceProps) {
    
    const {user} = usePrivy();
    console.log(currencyRate?.currency)

    const { attestation } = useGetAttestationData( memberInvoiceAttestation.memberInvoiceAttestationID )
    console.log(attestation)
    
    const { memberInvoiceAttestationData } = useDecodeMemberInvoiceAttestationData( attestation?.data )
    console.log(memberInvoiceAttestationData)

    const config : PaystackProps = {
        reference: memberInvoiceAttestation.memberInvoiceAttestationID,
        email: user!.email!.address!,
        amount: Number(currencyRate?.rate) * Number(2) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
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
        const deconstructedAttestationData = await deconstructAttestationData(memberInvoiceAttestation.memberInvoiceAttestationID, recepient, memberInvoiceAttestation.amount, currencyRate?.currency, memberInvoiceAttestation.week, score )
        const receipt = await attestReceipt(deconstructedAttestationData)
        if (receipt) {
            await postMemberReceiptAttestationAction(address!, memberInvoiceAttestation.memberInvoiceAttestationID, receipt?.attestationId, memberInvoiceAttestation.amount, currencyRate?.currency, memberInvoiceAttestation.week, 7 )
        }
        //getBackReceiptAttestation()
    };
      
    const onClose = () => {
        // implementation for whatever you want to do when the Paystack dialog closed.
        console.log('closed');
    };

    const initPaystackPayment = usePaystackPayment(config);

    const payMembershipDues = () => {
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
                    onClick={()=>{
                        payMembershipDues()
                    }}
                >
                    Pay
                </Button>
            </Card>
        </>
    )
}