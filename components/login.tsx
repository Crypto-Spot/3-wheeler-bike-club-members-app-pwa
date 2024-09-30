"use client";

import { useRouter } from "next/navigation";
import { usePrivy, User } from "@privy-io/react-auth";
import { useLogin } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";



//import { usePlausible } from "next-plausible"

export function Login() {
    const router = useRouter()
    
    const { ready, authenticated } = usePrivy()
    const { login } = useLogin({
        onComplete: ( wasAlreadyAuthenticated) => {
            
            setWasAuthenticated(wasAlreadyAuthenticated);        
        }
    })
    const [logging, setLogging] = useState<boolean>(false);
    const [wasAuthenticated, setWasAuthenticated] = useState<User | null>(null);

    useEffect(() => {
        if (logging && wasAuthenticated) {
            setLogging(false)
            router.replace("/dashboard");
        }
    }, [wasAuthenticated, logging, router]);

    const Login = async () => {
        try {
            setLogging(true)

            if (!authenticated) {
                login()
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <Button disabled={!ready} onClick={Login} className="w-60 cursor-pointer z-20">
            <div className="flex w-full items-center justify-between">
              <p>Enter 3 Wheeler Bike Club</p>
              <LogIn/>
            </div>
        </Button>
    );
}