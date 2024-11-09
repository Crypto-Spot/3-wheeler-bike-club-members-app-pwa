import { Coins, Landmark, Users } from "lucide-react";
import Image from "next/image";


export function Features() {
    return (
        <div className="flex flex-col w-full">
            {/** top */}
            <div className="flex w-full bg-yellow-400 text-black py-8 max-5xl:px-6 max-4xl:px-32 max-lg:px-28">
                <div className="flex w-full justify-evenly max-lg:flex-col max-lg:items-center max-lg:gap-8">
                    <div className="flex items-center gap-2 max-lg:w-40 max-lg:items-start">
                        <Coins className="h-8 w-8"/>
                        <div>
                            <p className="font-semibold text-3xl max-5xl:text-2xl max-lg:text-lg">MEMBER</p>
                            <p className="text-2xl max-5xl:text-xl max-lg:text-base">BENEFIT</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 max-lg:w-40 max-lg:items-start">
                        <Landmark className="h-8 w-8"/>
                        <div>
                            <p className="font-semibold text-3xl max-5xl:text-2xl max-lg:text-lg">EASY LOAN</p>
                            <p className="text-2xl max-5xl:text-xl max-lg:text-base">ACCESS</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 max-lg:w-40 max-lg:items-start">
                        <Users className="h-8 w-8"/>
                        <div>
                            <p className="font-semibold text-3xl max-5xl:text-2xl max-lg:text-lg">COMMUNITY</p>
                            <p className="text-2xl max-5xl:text-xl max-lg:text-base">FUND</p>
                        </div>
                    </div>
                </div>
            </div>


            {/** middle */}
            <div className="flex w-full px-60 py-12 bg-[#1F2327] justify-center max-lg:flex-col-reverse max-lg:px-28">
                {/** left */}
                <div className="flex w-1/2 justify-center max-lg:w-full">
                    <Image
                        className="max-4xl:w-[26rem]"
                        src="/images/kekeFeatures.svg"
                        alt=""
                        width={650}
                        height={650}
                    />
                </div>

                {/** right */}
                <div className="flex flex-col w-1/2 items-center justify-center max-lg:w-full max-lg:text-center">
                    <div className="flex flex-col gap-5">
                        <div className="w-[28rem] max-5xl:w-[26rem] max-5xl:w-[26rem] max-4xl:w-[20rem]">
                            <p className="text-5xl font-semibold max-5xl:text-4xl max-4xl:text-2xl">A NEW ERA</p>
                        </div>
                        <div className="w-[28rem] max-5xl:w-[26rem] max-4xl:w-[20rem]">
                            <p className="text-xl max-5xl:text-lg max-4xl:text-sm">No longer will drivers have to watch their hard earned money disappera to the drivers owners.</p>
                            <p className="text-xl max-5xl:text-lg max-4xl:text-sm">They get to easily own their vehcles and also access loans.</p>
                        </div>
                    </div>
                </div>
            </div>


            {/** down */}
            <div className="flex w-full px-60 py-12 bg-[#191C1F] max-lg:flex-col max-lg:px-28">
                {/** left */}
                <div className="flex flex-col w-1/2 items-center justify-center max-lg:w-full max-lg:text-center">
                    <div className="flex flex-col gap-5">
                        <div className="w-[36rem] max-5xl:w-[30rem] max-4xl:w-[20rem]">
                            <p className="text-5xl font-semibold max-5xl:text-4xl max-4xl:text-2xl">MAKE PAYMENTS AND ACCESS LOANS EASILY.</p>
                        </div>
                        <div className="w-[30rem] max-5xl:w-[28rem] max-4xl:w-[22rem]">
                            <p className="text-xl max-5xl:text-lg max-4xl:text-sm">No endless paying of  daily fees  also drivers have the opportunity to  request loans based on their reputation.</p>
                        </div>
                    </div>
                </div>
                

                {/** right */}
                <div className="flex w-1/2 justify-center max-lg:w-full">
                    <Image
                        className="max-4xl:w-[26rem]"
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