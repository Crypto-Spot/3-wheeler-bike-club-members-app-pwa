"use server"

export async function getThreeWheelBikerAction (address: string) {
    if (address) {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/getThreeWheelBiker`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-api-key": `${process.env.WHEELER_API_KEY}`
                },
                body: JSON.stringify({
                    address,
                })
            })
            const data = await res.json()
            return data
        } catch(err){
            console.log(err)
        }
    }
}