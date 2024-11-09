import { BookOpenIcon, Contact, FileQuestion, Home } from "lucide-react";
import Image from "next/image";


export function Header() {
    return (
        <div className="flex w-full px-40 py-12 justify-between bg-[#191C1F] max-lg:px-8">
            {/** left */}
            <div className="">
                <Image
                    src="/icons/512x512.png"
                    alt=""
                    width={60}
                    height={60}
                />
            </div>


            {/** right */}
            <div className="flex gap-5 text-xl max-5xl:text-lg">
                <div className="flex gap-1 items-center">
                    <Home/>
                    <p className="max-lg:hidden">home</p>
                </div>
                <div className="flex gap-1 items-center">
                    <BookOpenIcon/>
                    <p className="max-lg:hidden">features</p>
                </div>
                <div className="flex gap-1 items-center">
                    <FileQuestion/>
                    <p className="max-lg:hidden">about</p>
                </div>
                <div className="flex gap-1 items-center">
                    <Contact/>
                    <p className="max-lg:hidden">contact us</p>
                </div>
                <div></div>
            </div>
        </div>
    );
}