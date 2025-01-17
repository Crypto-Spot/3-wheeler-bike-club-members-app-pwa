import { useDecodeReceiptAttestationData } from "@/hooks/attestations/useDecodeReceiptAttestationData"
import { OffchainReceiptAttestation } from "@/hooks/attestations/useGetReceipAttestations"
import { CurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate"

interface ReceiptProps {
    address: string
    receiptAttestation: OffchainReceiptAttestation
    currencyRate: CurrencyRate
}
export function Receipt({ /*address,*/ receiptAttestation, /*currencyRate*/ }: ReceiptProps) {

    const { receiptAttestationData } = useDecodeReceiptAttestationData( receiptAttestation.receiptSchemaID )
    console.log(receiptAttestationData)

    return (
        <div>
            <h1>Receipt</h1>
        </div>
    )
}