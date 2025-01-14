"use client"
import { Bike, Coins, Home, Settings, Wallet } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";
import { Logout } from "./logout";
import Image from "next/image";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePrivy } from "@privy-io/react-auth";



export function Menu() {

  const { user } = usePrivy()
  
  const privyUserMetadata = user?.customMetadata

  const router = useRouter()

  return (
    <Sidebar>
      <div className="flex flex-col h-full pt-4 md:pt-8 lg:pt-20 w-full gap-6">
        <SidebarHeader>
          <Image src="/icons/512x512.png" alt="logo" width={40} height={40} /> 
        </SidebarHeader>
          <SidebarContent className="gap-12">    
            <SidebarGroup>
              <SidebarGroupContent>
              
                <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild
                        /*
                        onClick={()=>{
                          router.push("/profile")
                        }}
                        */
                      >
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={"https://github.com/shadcn.png"} alt={"name"} />
                          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">{privyUserMetadata?.firstname + " " + privyUserMetadata?.lastname}</span>
                          <span className="truncate text-xs">{user?.email?.address}</span>
                        </div>
                      </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={()=>{
                        router.push("/dashboard")
                      }}
                      asChild
                    >
                      <div className="flex items-center gap-2">
                        <Home size={18} color="gold"/>
                        <span className="text-base font-semibold">Dashboard</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={()=>{
                        router.push("/membership")
                      }}
                      asChild
                    >
                      <div className="flex items-center gap-2">
                        <Coins size={18} color="gold"/>
                        <span className="text-base font-semibold">Membership</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={()=>{
                        router.push("/sponsorship")
                      }}
                      asChild
                    >
                      <div className="flex items-center gap-2">
                        <Wallet size={18} color="gold" />
                        <span className="text-base font-semibold">Sponsorship</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={()=>{
                        router.push("/ownership")
                      }}
                      asChild
                    >
                      <div className="flex items-center gap-2">
                        <Bike size={18} color="gold"/>
                        <span className="text-base font-semibold">Ownership</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

          </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2">
                      <Settings size={18} color="gold"/>
                      <span className="text-base font-semibold">Settings</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2">
                      <Logout />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}