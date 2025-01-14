import { SidebarTrigger } from "../ui/sidebar";

export function Authorized() {
    
    return (
        <main className="flex min-h-screen w-full">
            <div className="flex-1 p-8">
                <div>
                    <SidebarTrigger />
                </div>
            </div>
        </main>
    )
}