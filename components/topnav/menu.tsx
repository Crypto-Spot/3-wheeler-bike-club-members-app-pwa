import { Bell, CheckCheck, Copy, MessagesSquare } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/utils/shorten";
import { useState } from "react";

export function Menu() {

    const { user } = usePrivy()

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const privyUserMetadata = user?.customMetadata
    
    const [copied, setCopied] = useState<boolean>(false)

    const handleCopy = async () => {
        if (smartWallet?.address) {
            await navigator.clipboard.writeText(smartWallet?.address);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };
    
    return (
        <>
            <div className="flex shrink-0">
                <SidebarTrigger/>
            </div>

            <div className="flex justify-between w-full shrink-0">
                <div className="flex flex-col gap-2">
                    <p><span className="text-sm italic">hello</span>, <span className="font-semibold text-2xl">{privyUserMetadata?.firstname}</span></p>
                    <div className="flex items-center gap-2">
                        <p className="text-xs">{ shortenAddress(smartWallet?.address) }</p>
                        {copied ? <CheckCheck size={12}/> : <Copy size={12} onClick={handleCopy}/>}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <MessagesSquare/>
                    <Bell />
                </div>
            </div>
        </>
    )
}