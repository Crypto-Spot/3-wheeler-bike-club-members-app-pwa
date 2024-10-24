import Image from "next/image";
import { Button } from "../ui/button";
import { Login } from "./login";


export function Hero() {
    return (
        <div className="flex w-full h-900">
            {/** left */}
            <div className="flex flex-col flex w-1/2 gap-20 justify-center">
                <div className="flex flex-col gap-5 text-8xl font-semibold">
                    <p>AFFORDABLE</p>
                    <p>3WHEELER MADE </p>
                    <p className="text-yellow-400">EASY</p>
                </div>
                <div className="flex">
                    <p>
                        Empower your Life, Own a 3wheeler and Create a sustainable future Onchain.
                    </p>
                </div>
                <div>
                    <Button>ADD TO HOME SCREEN</Button>
                    <Login/>
                </div>
            </div>


            {/** right */}
            <div className="flex w-1/2 justify-center">
                <Image
                    src="/images/kekeHero.svg"
                    alt=""
                    width={900}
                    height={900}
                />
            </div>
        </div>
    );
}