"use server"

export const postMemberBadgeAttestationAction = async (address: string, memberBadgeAttestationID: string, country: string, status: number) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postMemberBadgeAttestation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                memberBadgeAttestationID: memberBadgeAttestationID,
                country: country,
                status: status
            })
        })
    
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

