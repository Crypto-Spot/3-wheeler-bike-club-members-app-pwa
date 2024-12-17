"use server"

export async function getReceiptAttestationsAction (
    invoiceSchemaID: string
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/getReceiptAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                invoiceSchemaID: invoiceSchemaID
            })
        }) 
        const data =  await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}