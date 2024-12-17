"use server"

export async function postPThreeWheelBikerAction (
        address: string, 
        email: string,  
        first: string,  
        last: string,  
        country: string,  
    ) {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/postThreeWheelBiker`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-api-key": `${process.env.WHEELER_API_KEY}`
                },
                body: JSON.stringify({
                    address: address,
                    email: email,
                    first: first,
                    last: last,
                    country: country 
                })
            }) 
            const data =  await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }