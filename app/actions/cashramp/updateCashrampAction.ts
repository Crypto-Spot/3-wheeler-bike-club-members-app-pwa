"use server"


export async function updateCashrampAction(reference: string, status: string) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/updateCashramp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                reference: reference,
                status: status
            })
        })

        if (!res.ok) {
            throw new Error("Failed to update cashramp payment")
        }   

        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}