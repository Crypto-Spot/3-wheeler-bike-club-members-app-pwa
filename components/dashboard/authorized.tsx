import { Bell, Bike, CheckCheck, Coins, Copy, MessagesSquare, Wallet } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/utils/shorten";
import { useState } from "react";

export function Authorized() {

    const { user } = usePrivy()

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const privyUserMetadata = user?.customMetadata

    const router = useRouter()

    
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
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-8 lg:p-20 w-full gap-6">
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

                <div className="flex flex-col gap-4 w-full flex-1 overflow-y-auto">
                    <div className="">
                        <Card className="flex flex-col gap-2 items-center p-4 md:p-6">
                            <div className="flex flex-col items-center gap-5">
                                <Coins size={66} />
                                <div className="flex flex-col gap-2 items-center w-full max-w-96">
                                    <p className="text-3xl font-bold">Membership</p>
                                    <p>Contribute membership dues & build your reputation</p>
                                </div>
                            </div>
                            <div className="p-4 md:p-6 w-full max-w-[36rem]">
                                <Button className="w-full"
                                    onClick={()=>{
                                        router.push("/membership")
                                    }}
                                >
                                   Pay Dues
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="">
                        <Card className="flex flex-col gap-2 items-center p-4 md:p-6">
                            <div className="flex flex-col items-center gap-5">
                                <Wallet size={66} />
                                <div className="flex flex-col gap-2 items-center w-full max-w-96">
                                    <p className="text-3xl font-bold">Sponsorship</p>
                                    <p>Vote & Propose budgets for the unions activities</p>
                                </div>
                            </div>
                            <div className="p-4 md:p-6 w-full max-w-[36rem]">
                                <Button className="w-full"
                                    onClick={()=>{
                                        router.push("/sponsorship")
                                    }}
                                >
                                    Submit Proposal
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="">
                        <Card className="flex flex-col gap-2 items-center p-4 md:p-6">
                            <div className="flex flex-col items-center gap-5">
                                <Bike size={66} />
                                <div className="flex flex-col gap-2 items-center w-full max-w-96">
                                    <p className="text-3xl font-bold">Onwership</p>
                                    <p>Finance the ownership of your 3wheeler</p>
                                </div>
                            </div>
                            <div className="p-4 md:p-6 w-full max-w-[36rem]">
                                <Button className="w-full"
                                    onClick={()=>{
                                        router.push("/ownership")
                                    }}
                                >
                                    Finance Ownership
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}