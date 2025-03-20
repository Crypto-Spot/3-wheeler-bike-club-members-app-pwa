"use server"


export const postHirePurchaseReceiptAttestationAction = async (address: string, hirePurchaseInvoiceAttestationID: string, hirePurchaseReceiptAttestationID: string, vin: string, receiptID: string, amount: number, currency: string, score: number) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postHirePurchaseReceiptAttestation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                hirePurchaseInvoiceAttestationID: hirePurchaseInvoiceAttestationID,
                hirePurchaseReceiptAttestationID: hirePurchaseReceiptAttestationID,
                vin: vin,
                receiptID: receiptID,
                amount: amount,
                currency: currency,
                score: score,
            })
        })
    
        const data = await res.json()
        return data   
    } catch (error) {
        console.error(error)
    }
}


