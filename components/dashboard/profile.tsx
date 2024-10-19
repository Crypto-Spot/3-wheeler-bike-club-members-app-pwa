import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaceIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { usePrivy } from "@privy-io/react-auth"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { motion } from "framer-motion";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets"
import { base } from "viem/chains"
import { basenameRegistrar } from "@/utils/constants/addresses"
import { getBasename } from "@/utils/basenames/getBasename"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Countries } from '@/utils/constants/countries'
import { setCustomPrivyData } from "@/app/actions/setCustomPrivyData"
import { feeDrip } from "@/utils/basenames/feeDrip"
import { parseEther } from "viem"




const FormSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    country: z.string(),
})




export function Profile () {
    const { user } = usePrivy()
    console.log(user)

    const privyUserMetadata = user?.customMetadata
    console.log(privyUserMetadata?.country);
    const did = user?.id
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    // Logs the smart wallet's address
    console.log(smartWallet?.type);
    // Logs the smart wallet type (e.g. 'safe', 'kernel', 'light_account', 'biconomy')

    const {client} = useSmartWallets();
    
    console.log(user?.linkedAccounts)

    const countries = Object.keys(Countries);
     
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean | null>(null)


    


    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstname: undefined,
            lastname: undefined,
            country: undefined,
        },
    })

   
    
    

    
    async function registerProfileBasename( basenameData: `0x${string}` ) {
        
        const txHash = await client?.sendTransaction({
            account: client?.account,
            chain: base,
            to: basenameRegistrar,
            data: basenameData,
            value: parseEther("0.0001")
        });
        return txHash
    }
    
    async function onSubmit() {
        try {
            const firstname = form.watch("firstname")
            console.log(firstname)
            const lastname = form.watch("lastname")
            console.log(lastname)
            const country = form.watch("country")
            console.log(country)
            setLoading(true)
            if (!firstname || !lastname || !country || !did) return
            const drip = feeDrip(smartWallet?.address as `0x${string}`)
            const privyData = {
                firstname,
                lastname,
                country,
            }
            if (!drip) return
            await setCustomPrivyData(did, privyData)
            const name = firstname.toLocaleLowerCase() + lastname.toLocaleLowerCase() + "🛺💨"
            const basenameData = await getBasename(name, smartWallet?.address as `0x${string}`)
            console.log(basenameData)
            await registerProfileBasename(basenameData)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        if (  !loading) {
            setOpen(false)
        }
    }, [ loading])

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                onClose={()=>{
                    //
                }}
            >
                <DrawerTrigger asChild>
                    <Button 
                        className="gap-2" 
                        variant="outline"
                        onClick={()=>{
                            setOpen(true)
                        }}
                    >
                        <FaceIcon/>
                        <span className="max-md:hidden">Edit Profile</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Edit profile</DrawerTitle>
                            <DrawerDescription>Make changes to your profile here. Click save when done.</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col p-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                    <FormLabel className="text-right">First Name</FormLabel>
                                                    <FormControl >
                                                        <Input disabled={ loading! || privyUserMetadata?.firstname as string !== undefined } className="col-span-3" placeholder={!privyUserMetadata ? "vitalik" : privyUserMetadata?.firstname as string} {...field} />
                                                    </FormControl>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                    <FormLabel className="text-right">Last Name</FormLabel>
                                                    <FormControl >
                                                        <Input disabled={ loading! || privyUserMetadata?.lastname as string !== undefined } className="col-span-3" placeholder={!privyUserMetadata ? "buterin" : privyUserMetadata?.lastname as string} {...field} />
                                                    </FormControl>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='country'
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                    <FormLabel className='text-right'>Country</FormLabel>
                                                    {
                                                        !privyUserMetadata
                                                        ?(
                                                            <>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                    <SelectTrigger className='col-span-3'>
                                                                        <SelectValue placeholder='Select a Country' />
                                                                    </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className='col-span-3'>
                                                                        <SelectGroup>
                                                                            {countries!.map((country) => (
                                                                                <SelectItem
                                                                                    key={country}
                                                                                    value={country}
                                                                                >
                                                                                    {country}
                                                                                </SelectItem> 
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </>
                                                        )
                                                        :(
                                                            <>
                                                            <FormControl>
                                                                <Input disabled className='col-span-3' placeholder={privyUserMetadata?.country as string} {...field} />
                                                            </FormControl>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            
                                            </FormItem>
                                        )}
                                    />
                                    
                            
                                    <div className="flex justify-end">
                                        <Button
                                            className="w-36"
                                            disabled={loading! || privyUserMetadata?.lastname as string !== undefined}
                                            type="submit"
                                        >
                                            {
                                                loading
                                                ? (
                                                    <>
                                                        <motion.div
                                                        initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                                        animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                                        transition={{
                                                            duration: 1, // Animation duration in seconds
                                                            repeat: Infinity, // Infinity will make it rotate indefinitely
                                                            ease: "linear", // Animation easing function (linear makes it constant speed)
                                                        }}
                                                    >
                                                            <DotsHorizontalIcon/>
                                                        </motion.div>
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        Save changes
                                                    </>
                                                )
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )

}