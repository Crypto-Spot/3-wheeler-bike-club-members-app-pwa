"use server"

export interface Cashramp {
    _id: string
    address: string
    reference: string
    hostedLink: string
    id: string
    status: string
} 

export async function getCashrampAction(reference: string) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/getCashramp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                reference: reference
            })
        })

        if (!res.ok) {
            throw new Error("Failed to fetch cashramp payment")
        }

        const data = await res.json()
        return data as Cashramp
        
    } catch (error) {
        console.error(error)
        throw error
    }
}
