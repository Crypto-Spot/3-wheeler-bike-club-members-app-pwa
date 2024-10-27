import { Coins, Landmark, Users } from "lucide-react";


export function Features() {
    return (
        <div className="flex w-full bg-blue-900">
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


            {/** down */}
            <div className="">
                {/** left */}
                <div></div>

                {/** right */}
                <div></div>
            </div>
        </div>
    );
}