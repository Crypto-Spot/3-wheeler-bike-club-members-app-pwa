import Image from "next/image";
import { Button } from "../ui/button";
import { Login } from "./login";


export function Hero() {
    return (
        <div className="flex w-full px-60 bg-[#191C1F]">
            {/** left */}
            <div className="flex flex-col flex w-1/2 items-end justify-center">
                <div className="flex flex-col gap-20 max-3xl:gap-14 max-2xl:gap-12 max-xl:gap-6">
                    <div className="flex flex-col font-semibold gap-5 w-[50rem] text-7xl max-6xl:text-[4.2rem] max-6xl:w-[39.5rem] max-5xl:text-5xl max-5xl:w-[32rem] max-4xl:text-5xl max-4xl:w-[28rem] max-3xl:text-[2.8rem] max-3xl:w-[26rem] max-2xl:text-4xl max-2xl:w-[20rem] max-xl:text-4xl max-xl:w-[20rem]">
                        <p>AFFORDABLE 3WHEELER MADE <span className="text-yellow-400">EASY</span></p>
                    </div>
                    <div className="flex text-2xl w-[33rem] max-6xl:text-xl max-6xl:w-[27rem] max-5xl:text-lg max-5xl:w-[24.5rem] max-xl:text-base max-xl:w-[22rem]">
                        <p>
                            Empower your Life, Own a 3wheeler and Create a sustainable future Onchain.
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <Button >ADD TO HOME SCREEN</Button>
                        <Login/>
                    </div>
                </div>
            </div>


            {/** right */}
            <div className="flex w-1/2 justify-center">
                <Image
                    src="/images/kekeHero.svg"
                    alt=""
                    width={800}
                    height={800}
                />
            </div>
        </div>
    );
}