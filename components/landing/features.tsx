import { Coins, Landmark, Users } from "lucide-react";
import Image from "next/image";


export function Features() {
    return (
        <div className="flex flex-col w-full">
            {/** top */}
            <div className="flex w-full bg-yellow-400 text-black justify-evenly py-8">
                <div className="flex items-center gap-2">
                    <Coins className="h-8 w-8"/>
                    <div>
                        <p className="font-semibold text-3xl">MEMBER</p>
                        <p className="text-2xl">BENEFIT</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Landmark className="h-8 w-8"/>
                    <div>
                        <p className="font-semibold text-3xl">EASY LOAN</p>
                        <p className="text-2xl">ACCESS</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-8 w-8"/>
                    <div>
                        <p className="font-semibold text-3xl">COMMUNITY</p>
                        <p className="text-2xl">FUND</p>
                    </div>
                </div>
            </div>


            {/** middle */}
            <div className="flex w-full px-60">
                {/** left */}
                <div className="flex w-1/2 justify-center">
                    <Image
                        src="/images/kekeFeatures.svg"
                        alt=""
                        width={900}
                        height={900}
                    />
                </div>

                {/** right */}
                <div className="flex flex-col w-1/2 items-center justify-center">
                    <div className="flex flex-col gap-5">
                        <div className="w-[28rem]">
                            <p className="text-5xl font-semibold">A NEW ERA</p>
                        </div>
                        <div className="w-[28rem]">
                            <p className="text-xl">No longer will drivers have to watch their hard earned money disappera to the drivers owners.</p>
                            <p className="text-xl">They get to easily own their vehcles and also access loans.</p>
                        </div>
                        
                        
                    </div>
                </div>
            </div>


            {/** down */}
            <div className="flex w-full px-60">
                {/** left */}
                <div className="flex flex-col w-1/2 items-center justify-center">
                    <div className="flex flex-col gap-5">
                        <div className="w-[36rem]">
                            <p className="text-5xl font-semibold">MAKE PAYMENTS AND ACCESS LOANS EASILY.</p>
                        </div>
                        <div className="w-[30rem]">
                            <p className="text-xl">No endless paying of  daily fees  also drivers have the opportunity to  request loans based on their reputation.</p>
                        </div>
                    </div>
                </div>
                

                {/** right */}
                <div className="flex w-1/2 justify-center">
                    <Image
                        src="/images/kekeFeaturesLorry.svg"
                        alt=""
                        width={900}
                        height={900}
                    />
                </div>
                
            </div>
        </div>
    );
}