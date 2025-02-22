import { Caravan, Coins, Wallet } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Menu } from "../topnav/menu";

export function Authorized() {

    
    const router = useRouter()
    
    
    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                
                <Menu/>

                <div className="flex flex-col gap-4 w-full flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="">
                        <Card className="flex flex-col gap-2 items-center p-4 md:p-6">
                            <div className="flex flex-col items-center gap-5">
                                <Coins size={66} />
                                <div className="flex flex-col gap-2 items-center w-full max-w-96 text-center">
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
                                <div className="flex flex-col gap-2 items-center w-full max-w-96 text-center">
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
                                    Proposal Pool
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="">
                        <Card className="flex flex-col gap-2 items-center p-4 md:p-6">
                            <div className="flex flex-col items-center gap-5">
                                <Caravan size={66} />
                                <div className="flex flex-col gap-2 items-center w-full max-w-96 text-center">
                                    <p className="text-3xl font-bold">Ownership</p>
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