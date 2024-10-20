import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { Logout } from "../logout";
import { Profile } from "./profile";
import { Basenames } from "./basename";
import { Attestation, useGetAttestations } from "@/hooks/transactions/useGetAttestations";
import { Invoice } from "./invoice";

export function Authorized() {

    const {user} = usePrivy();
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const { attestations } = useGetAttestations( smartWallet?.address )
    console.log(attestations)
    
    const privyUserMetadata = user?.customMetadata
    
    return (
        <main className="flex flex-col w-full h-full items-center gap-8 p-24 max-md:p-6">
                <div className="flex w-full justify-between">
                    <div>
                        <Image
                            src="/icons/512x512.png"
                            alt=""
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Profile/>
                        <Logout/>
                    </div>
                </div>
            
                
                <div className="flex w-full items-center justify-center">
                    {
                        !privyUserMetadata
                        && (
                            <div>
                                <p>whoa! make profile woodie...</p>
                            </div>
                        )
                    }
                    {
                        privyUserMetadata
                        && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Welcome: </p>
                                    <Basenames address={smartWallet?.address as `0x${string}`}/>
                                </div>
                                <div>
                                    {
                                        !attestations 
                                        ?(
                                            <>
                                                Your Weekly Membership Invoices will appear here. Pay them on time for good credit
                                            </>
                                        )

                                        :(
                                            <div className="flex flex-col gap-8">
                                                <div className="flex flex-col gap-2">
                                                    <p>Click any of the Invoices to pay you weekly membership dues on time & stay in good credit Standing</p>
                                                    <p>Your Total score is: </p>
                                                </div>
                                                <div>
                                                {attestations?.map((attestation: Attestation) => (
                                                    <Invoice key={attestation._id} attestation={attestation}/>
                                                ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    
                    
                </div>
        </main>
    )
}