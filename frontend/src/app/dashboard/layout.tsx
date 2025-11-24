import { Header } from "./components/header"
import { OrderProvider } from "@/providers/order"
import { NotificationProvider } from "@/providers/notification" 

export default function DashboardLayout({children}:
    {children: React.ReactNode}
){
    return(
        <NotificationProvider> 
            <Header/>
            <OrderProvider>
                {children}
            </OrderProvider>    
        </NotificationProvider>
    )
}