import { Coins, Landmark, Users } from "lucide-react";
import Image from "next/image";


export function Features() {
    return (
        <div className="flex flex-col w-full">
            {/** top */}
            <div className="flex w-full bg-yellow-400 text-black justify-evenly py-8 max-2xl:px-6">
                <div className="flex items-center gap-2">
                    <Coins className="h-8 w-8"/>
                    <div>
                        <p className="font-semibold text-3xl max-2xl:text-2xl">MEMBER</p>
                        <p className="text-2xl max-2xl:text-xl">BENEFIT</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Landmark className="h-8 w-8"/>
                    <div>
                        <p className="font-semibold text-3xl max-2xl:text-2xl">EASY LOAN</p>
                        <p className="text-2xl max-2xl:text-xl">ACCESS</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-8 w-8"/>
                    <div>
                        <p className="font-semibold text-3xl max-2xl:text-2xl">COMMUNITY</p>
                        <p className="text-2xl max-2xl:text-xl">FUND</p>
                    </div>
                </div>
            </div>


            {/** middle */}
            <div className="flex w-full px-60 py-12 bg-[#1F2327]">
                {/** left */}
                <div className="flex w-1/2 justify-center">
                    <Image
                        src="/images/kekeFeatures.svg"
                        alt=""
                        width={650}
                        height={650}
                    />
                </div>

                {/** right */}
                <div className="flex flex-col w-1/2 items-center justify-center">
                    <div className="flex flex-col gap-5">
                        <div className="w-[28rem] max-2xl:w-[26rem]">
                            <p className="text-5xl font-semibold max-2xl:text-4xl">A NEW ERA</p>
                        </div>
                        <div className="w-[28rem] max-2xl:w-[26rem]">
                            <p className="text-xl max-2xl:text-lg">No longer will drivers have to watch their hard earned money disappera to the drivers owners.</p>
                            <p className="text-xl max-2xl:text-lg">They get to easily own their vehcles and also access loans.</p>
                        </div>
                        
                        
                    </div>
                </div>
            </div>


            {/** down */}
            <div className="flex w-full px-60 bg-[#191C1F]">
                {/** left */}
                <div className="flex flex-col w-1/2 items-center justify-center">
                    <div className="flex flex-col gap-5">
                        <div className="w-[36rem] max-2xl:w-[30rem]">
                            <p className="text-5xl font-semibold max-2xl:text-4xl">MAKE PAYMENTS AND ACCESS LOANS EASILY.</p>
                        </div>
                        <div className="w-[30rem] max-2xl:w-[28rem]">
                            <p className="text-xl max-2xl:text-lg">No endless paying of  daily fees  also drivers have the opportunity to  request loans based on their reputation.</p>
                        </div>
                    </div>
                </div>
                

                {/** right */}
                <div className="flex w-1/2 justify-center">
                    <Image
                        src="/images/kekeFeaturesLorry.svg"
                        alt=""
                        width={650}
                        height={650}
                    />
                </div>
                
            </div>
        </div>
    );
}