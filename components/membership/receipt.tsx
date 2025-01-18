import { useDecodeReceiptAttestationData } from "@/hooks/attestations/useDecodeReceiptAttestationData"
import { OffchainReceiptAttestation } from "@/hooks/attestations/useGetReceipAttestations"
import { Card } from "../ui/card"
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button"

interface ReceiptProps {
    receiptAttestation: OffchainReceiptAttestation
}
export function Receipt({ receiptAttestation }: ReceiptProps) {

    const { attestation } = useGetAttestationData( receiptAttestation.receiptSchemaID )
    console.log(attestation)

    const { receiptAttestationData } = useDecodeReceiptAttestationData( attestation?.data )
    console.log(receiptAttestationData)

    return (
        <>
            <Card className="flex w-full justify-between">
                <div className="flex flex-col">
                    <p>Amount: {Number(receiptAttestationData?.Amount)}</p>
                    <p>Week: {receiptAttestationData?.Week}</p>
                    <p>Score: {Number(receiptAttestationData?.Score)}</p>
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