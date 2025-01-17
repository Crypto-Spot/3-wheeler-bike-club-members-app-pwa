import { Bike } from "lucide-react";
import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Image from "next/image";

export function Authorized() {
    
    
    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                
                <Menu/>

                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Bike className="h-4 w-4" />
                        <AlertTitle className="font-bold">Ownership!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Finance the ownership of your 3wheeler.
                        </AlertDescription>
                    </Alert>
                </div>
                    
                <div className="flex items-center justify-center">
                    <Image 
                        src="/images/construction.svg" 
                        alt="sponsorship" 
                        width={800} 
                        height={800}
                        className="w-auto h-auto max-w-full max-h-[66vh] object-contain" 
                    />    
                </div>
            </div>
        </main>
    )
}