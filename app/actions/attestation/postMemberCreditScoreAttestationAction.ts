"use server"

export async function postMemberCreditScoreAttestationAction (
    address: string,
    memberCreditScoreAttestationID: string,
    score: number,
    paidWeeks: number,
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postMemberCreditScoreAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                memberCreditScoreAttestationID: memberCreditScoreAttestationID,
                score: score,
                paidWeeks: paidWeeks
            })
        }) 
        const data =  await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
