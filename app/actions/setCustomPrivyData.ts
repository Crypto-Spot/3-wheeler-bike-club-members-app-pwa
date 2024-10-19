"use server"
export interface privyUserMetadataProps {
    firstname: string
    lastname: string
    country: string
    
}

export async function setCustomPrivyData (did: string, privyUserMetadata: privyUserMetadataProps) {

    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    const privyAppSecret = process.env.PRIVY_APP_SECRET;

    const url = `https://auth.privy.io/api/v1/users/${did}/custom_metadata`;

    const headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(`${privyAppId}:${privyAppSecret}`));
    headers.set("privy-app-id", privyAppId);
    headers.set("Content-Type", "application/json");

    const body = JSON.stringify({
        custom_metadata: privyUserMetadata
    });

    try {
        const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body
        });

        if (!response.ok) {
        throw new Error("Failed to update metadata");
        }

        const data = await response.json();
        console.log("Success:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
    
}