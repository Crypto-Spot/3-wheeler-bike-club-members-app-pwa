"use server"

export async function postMemberReceiptAttestationAction (
    address: string, 
    memberInvoiceAttestationID: string,
    memberReceiptAttestationID: string,
    amount: number,
    currency: string,
    week: string,
    score: number
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postMemberReceiptAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                memberInvoiceAttestationID: memberInvoiceAttestationID,
                memberReceiptAttestationID: memberReceiptAttestationID,
                amount: amount,
                currency: currency,
                week: week,
                score: score
            })
        }) 
        const data =  await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}