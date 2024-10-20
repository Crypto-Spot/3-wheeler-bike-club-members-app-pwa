"use server"

export async function updateAttestationAction (
    _id: string, 
    UID: string, 
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/updateAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                _id,
                UID, 
            })
        }) 
        const data =  await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
    
}