import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { Logout } from "../logout";
import { Profile } from "./profile";
import { Basenames } from "./basename";

export function Authorized() {

    const {user} = usePrivy();
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const privyUserMetadata = user?.customMetadata
    
    return (
        <main className="flex flex-col w-full items-center gap-8 p-24 max-md:p-6">
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
                            <Basenames address={smartWallet?.address as `0x${string}`}/>
                        )
                    }
                    
                    
                </div>
        </main>
    )
}