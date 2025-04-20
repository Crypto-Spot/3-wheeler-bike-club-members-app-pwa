"use server"


export async function postCashrampAction(address: string, reference: string, hostedLink: string, id: string, status: string) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postCashramp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                reference: reference,
                hostedLink: hostedLink,
                id: id,
                status: status
            })
        })

        if (!res.ok) {
            throw new Error("Failed to post cashramp payment")
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}
