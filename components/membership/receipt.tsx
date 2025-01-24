import { useDecodeMemberReceiptAttestationData } from "@/hooks/attestations/useDecodeMemberReceiptAttestationData"
import { OffchainMemberReceiptAttestation } from "@/hooks/attestations/useGetMemberReceipAttestations"
import { Card } from "../ui/card"
import { useGetAttestationData } from "@/hooks/attestations/useGetAttestationData"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button"

interface ReceiptProps {
    memberReceiptAttestation: OffchainMemberReceiptAttestation
}
export function Receipt({ memberReceiptAttestation }: ReceiptProps) {

    const { attestation } = useGetAttestationData( memberReceiptAttestation.memberReceiptAttestationID )
    console.log(attestation)

    const { memberReceiptAttestationData } = useDecodeMemberReceiptAttestationData( attestation?.data )
    console.log(memberReceiptAttestationData)

    return (
        <>
            <Card className="flex w-full justify-between">
                <div className="flex flex-col">
                    <p>Amount: {Number(memberReceiptAttestation?.amount)}</p>
                    <p>Week: {memberReceiptAttestation?.week}</p>
                    <p>Score: {Number(memberReceiptAttestation?.score)}</p>
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