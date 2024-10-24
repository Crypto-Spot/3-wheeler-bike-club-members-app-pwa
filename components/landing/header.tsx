import { BookOpenIcon, Contact, FileQuestion, Home } from "lucide-react";
import Image from "next/image";


export function Header() {
    return (
        <div className="flex w-full justify-between">
            {/** left */}
            <div className="">
                <Image
                    src="/icons/512x512.png"
                    alt=""
                    width={40}
                    height={40}
                />
            </div>


            {/** right */}
            <div className="flex gap-5">
                <div className="flex gap-1">
                    <Home/>
                    <p>Home</p>
                </div>
                <div className="flex gap-1">
                    <BookOpenIcon/>
                    <p>Features</p>
                </div>
                <div className="flex gap-1">
                    <FileQuestion/>
                    <p>About</p>
                </div>
                <div className="flex gap-1">
                    <Contact/>
                    <p>Contact us</p>
                </div>
                <div></div>
            </div>
        </div>
    );
}