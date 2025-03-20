"use server"

export const getHirePurchaseAttestationAction = async (address: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/getHirePurchaseAttestation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address
            })
        })
    
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

