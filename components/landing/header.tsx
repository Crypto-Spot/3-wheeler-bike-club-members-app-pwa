import { BookOpenIcon, Contact, FileQuestion, Home } from "lucide-react";
import Image from "next/image";


export function Header() {
    return (
        <div className="flex w-full px-40 py-12 justify-between max-md:px-4">
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
            <div className="flex gap-5 text-xl">
                <div className="flex gap-1 items-center">
                    <Home/>
                    <p>home</p>
                </div>
                <div className="flex gap-1 items-center">
                    <BookOpenIcon/>
                    <p>features</p>
                </div>
                <div className="flex gap-1 items-center">
                    <FileQuestion/>
                    <p>about</p>
                </div>
                <div className="flex gap-1 items-center">
                    <Contact/>
                    <p>contact us</p>
                </div>
                <div></div>
            </div>
        </div>
    );
}