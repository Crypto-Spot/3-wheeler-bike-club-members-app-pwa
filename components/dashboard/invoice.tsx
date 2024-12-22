import { OffchainInvoiceAttestation } from "@/hooks/attestations/useGetInvoiceAttestations";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { useGetReceiptAttestation } from "@/hooks/attestations/useGetReceipAttestation";
import { postReceiptAttestationAction } from "@/app/actions/attestation/postReceiptAttestationAction";
import { deconstructAttestationData } from "@/utils/attest/deconstructAttestationData";
import { attestReceipt } from "@/utils/attest/attestReceipt";
import { usePrivy } from "@privy-io/react-auth";

interface InvoiceProps {
    address: string
    invoiceAttestation: OffchainInvoiceAttestation
}

export function Invoice ({ address, invoiceAttestation }: InvoiceProps) {
    
    const {user} = usePrivy();

    const { receiptAttestation, getBackReceiptAttestation } = useGetReceiptAttestation( invoiceAttestation.invoiceSchemaID )
    console.log(receiptAttestation)

    const config : PaystackProps = {
        reference: invoiceAttestation.invoiceSchemaID,
        email: user!.email!.address!,
        amount: Number(2) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
        currency: "GHS",
        channels: ['card', 'mobile_money'],
    }
    
    interface referenceTypes {
        reference: string
    }
    const onSuccess = async (reference: referenceTypes) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log('reference', reference);
        const recepient: string[] = []
        recepient.push(address)
        const deconstructedAttestationData = await deconstructAttestationData(invoiceAttestation.invoiceSchemaID, recepient, 2, "52,2024", 7 )
        const receipt = await attestReceipt(deconstructedAttestationData)
        if (receipt) {
            await postReceiptAttestationAction(address, invoiceAttestation.invoiceSchemaID, receipt?.attestationId)
        }
        getBackReceiptAttestation()
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
            <Card className="flex justify-between">
                <div className="flex flex-col">
                    <p>week: {invoiceAttestation._id}</p>
                    <div>
                        {
                            !receiptAttestation
                            ? (
                                <>
                                <p>status: Unpaid {invoiceAttestation.invoiceSchemaID }</p>
                                </>
                            )
                            : (
                                <>
                                    <p>status: Paid  {invoiceAttestation.invoiceSchemaID }</p>
                        
                                </>
                            
                            )
                        }
                    </div>
                </div>
                {
                    !receiptAttestation && (
                        <Button
                            onClick={()=>{
                                payMembershipDues()
                            }}
                        >
                            Pay
                        </Button>
                    )
                }
            </Card>
        </>
    )
}