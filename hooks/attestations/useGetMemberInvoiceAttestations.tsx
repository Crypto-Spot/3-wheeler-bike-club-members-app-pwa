import { getMemberInvoiceAttestationsAction } from "@/app/actions/attestation/getMemberInvoiceAttestationsAction"
import { useState, useEffect } from "react"
import { OffchainMemberReceiptAttestation } from "./useGetMemberReceipAttestations"
import { getMemberReceiptAttestationsAction } from "@/app/actions/attestation/getMemberReceiptAttestationsAction"

export interface OffchainMemberInvoiceAttestation {
    _id: string
    memberInvoiceAttestationID: string
    amount: number
    week: string
}

export const useGetMemberInvoiceAttestations = (address: string| undefined) => {
    const [memberInvoiceAttestations, setMemberInvoiceAttestations] = useState<OffchainMemberInvoiceAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getInvoiceAttestations() {
            if (address) {
                setLoading(true);
                try {
                    // Get both invoices and receipts
                    const invoicesData: OffchainMemberInvoiceAttestation[] = await getMemberInvoiceAttestationsAction(address)
                    const receiptsData: OffchainMemberReceiptAttestation[] = await getMemberReceiptAttestationsAction(address)

                    // Filter out invoices that have receipts
                    const unpaidInvoices = invoicesData.filter((invoice: OffchainMemberInvoiceAttestation) => 
                        !receiptsData?.some((receipt: OffchainMemberReceiptAttestation) => 
                            receipt.memberInvoiceAttestationID === invoice.memberInvoiceAttestationID
                        )
                    )

                    setMemberInvoiceAttestations(unpaidInvoices)
                } catch(err) {
                    setError(err)
                }
                setLoading(false)
            }
        }
        getInvoiceAttestations()
    }, [address])

    async function getBackMemberInvoiceAttestations() {
        if (address) {
            setLoading(true);
            try {
                // Get both invoices and receipts
                const memberInvoicesData: OffchainMemberInvoiceAttestation[] = await getMemberInvoiceAttestationsAction(address)
                const memberReceiptsData: OffchainMemberReceiptAttestation[] = await getMemberReceiptAttestationsAction(address)

                // Filter out invoices that have receipts
                const unpaidInvoices = memberInvoicesData.filter((invoice: OffchainMemberInvoiceAttestation) => 
                    !memberReceiptsData?.some((receipt: OffchainMemberReceiptAttestation) => 
                        receipt.memberInvoiceAttestationID === invoice.memberInvoiceAttestationID
                    )
                )

                setMemberInvoiceAttestations(unpaidInvoices)
            } catch(err) {
                setError(err)
            }
            setLoading(false)
        }
    }

    return { memberInvoiceAttestations, loading, error, getBackMemberInvoiceAttestations }
}