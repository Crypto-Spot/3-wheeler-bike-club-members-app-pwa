import { getInvoiceAttestationsAction } from "@/app/actions/attestation/getInvoiceAttestationsAction"
import { useState, useEffect } from "react"
import { OffchainReceiptAttestation } from "./useGetReceipAttestations"
import { getReceiptAttestationsAction } from "@/app/actions/attestation/getReceiptAttestationsAction"

export interface OffchainInvoiceAttestation {
    _id: string
    invoiceSchemaID: string
}

export const useGetInvoiceAttestations = (address: string| undefined) => {
    const [invoiceAttestations, setInvoiceAttestations] = useState<OffchainInvoiceAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getInvoiceAttestations() {
            if (address) {
                setLoading(true);
                try {
                    // Get both invoices and receipts
                    const invoicesData: OffchainInvoiceAttestation[] = await getInvoiceAttestationsAction(address)
                    const receiptsData: OffchainReceiptAttestation[] = await getReceiptAttestationsAction(address)

                    // Filter out invoices that have receipts
                    const unpaidInvoices = invoicesData.filter((invoice: OffchainInvoiceAttestation) => 
                        !receiptsData?.some((receipt: OffchainReceiptAttestation) => 
                            receipt.invoiceSchemaID === invoice.invoiceSchemaID
                        )
                    )

                    setInvoiceAttestations(unpaidInvoices)
                } catch(err) {
                    setError(err)
                }
                setLoading(false)
            }
        }
        getInvoiceAttestations()
    }, [address])

    async function getBackInvoiceAttestations() {
        if (address) {
            setLoading(true);
            try {
                // Get both invoices and receipts
                const invoicesData: OffchainInvoiceAttestation[] = await getInvoiceAttestationsAction(address)
                const receiptsData: OffchainReceiptAttestation[] = await getReceiptAttestationsAction(address)

                // Filter out invoices that have receipts
                const unpaidInvoices = invoicesData.filter((invoice: OffchainInvoiceAttestation) => 
                    !receiptsData?.some((receipt: OffchainReceiptAttestation) => 
                        receipt.invoiceSchemaID === invoice.invoiceSchemaID
                    )
                )

                setInvoiceAttestations(unpaidInvoices)
            } catch(err) {
                setError(err)
            }
            setLoading(false)
        }
    }

    return { invoiceAttestations, loading, error, getBackInvoiceAttestations }
}