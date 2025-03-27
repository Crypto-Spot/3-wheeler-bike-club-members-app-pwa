"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { createContext, ReactNode, useContext, useState } from "react"

type Props = {
    children: ReactNode,
}

interface SidebarInterface {
    sidebarOpen: boolean;
    setSidebarOpen: (sidebarOpen: boolean) => void;
};

const Sidebar = createContext<SidebarInterface>({
    sidebarOpen: false,
    setSidebarOpen: () => {}
});

export function useSidebar () {
    return useContext(Sidebar);
};

export function SidebarContext({children}: Props){
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Sidebar.Provider value={{sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen}}>
            <SidebarProvider open={sidebarOpen}>
                {children}
            </SidebarProvider>
        </Sidebar.Provider>
    )
}
