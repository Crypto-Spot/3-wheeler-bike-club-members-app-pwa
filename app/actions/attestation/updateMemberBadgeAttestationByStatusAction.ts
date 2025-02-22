"use server"

export const updateMemberBadgeAttestationByStatusAction = async (address: string, memberBadgeAttestationID: string, status: number) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/updateMemberBadgeAttestationByStatus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                memberBadgeAttestationID: memberBadgeAttestationID,
                status: status
            })
        })
    
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

