import { Card } from "../ui/card"
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button"
import { OffchainHirePurchaseReceiptAttestation } from "@/hooks/attestations/useGetHirePurchaseReceiptAttestations"

interface ReceiptProps {
    hirePurchaseReceiptAttestation: OffchainHirePurchaseReceiptAttestation
}
export function Receipt({ hirePurchaseReceiptAttestation }: ReceiptProps) {

    const { attestation } = useGetAttestationData( hirePurchaseReceiptAttestation.hirePurchaseReceiptAttestationID )
    console.log(attestation)

    //const { hirePurchaseReceiptAttestationData } = useDecodeHirePurchaseReceiptAttestationData( attestation?.data )
    //console.log(hirePurchaseReceiptAttestationData)

    return (
        <>
            <Card className="flex w-full justify-between">
                <div className="flex flex-col">
                    <p>Receipt ID: {hirePurchaseReceiptAttestation?.receiptID}</p>
                    <p>Amount in {hirePurchaseReceiptAttestation?.currency}: {(Number(hirePurchaseReceiptAttestation?.amount)/100)} {hirePurchaseReceiptAttestation?.currency} </p>
                    <p>Week: {hirePurchaseReceiptAttestation?.receiptID}</p>
                    <p>Score: {Number(hirePurchaseReceiptAttestation?.score)}</p>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">View Receipt</Button>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-center justify-center">
                        <div className="flex flex-1 items-center justify-center">
                            <Image 
                                src="/images/construction.svg" 
                                alt="sponsorship" 
                                width={800} 
                                height={800}
                                className="w-auto h-auto max-w-full max-h-[66vh] object-contain" 
                            />  
                        </div>
                    </SheetContent>
                </Sheet>
            </Card>
        </>
    )
}