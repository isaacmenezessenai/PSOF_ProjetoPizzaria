"use client"

import { createContext, ReactNode, useState } from "react"
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Interface corrigida: Adicionando o campo 'status' no Item
export interface OrderItemProps{
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    
    // <<< CORREÇÃO PRINCIPAL AQUI >>>
    status: boolean; // O Status do Item individual (Concluído/Pendente)
    
    product:{
        id:string;
        name:string;
        price:string;
        description:string;
        banner: string;
        category_id: string;
    };
    order:{
        id:string;
        table_id:string;
        name:string | null; 
        draft:boolean;
        status:boolean; // Este é o status da ORDEM (Aberta/Fechada), não do Item
        table:{
            number: string;
        }
    };
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen:(order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
    // <<< NOVO: Função para atualizar o status do item >>>
    updateItemStatus: (itemId: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({children}: OrderProviderProps){
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([])
    const router = useRouter();

    async function onRequestOpen(order_id: string){
        const token = getCookieClient();

        const response = await api.get("/order/detail", {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                order_id: order_id
            }
        })

        setOrder(response.data);
        setIsOpen(true)
    }

    function onRequestClose(){
        setIsOpen(false)
    }

    async function finishOrder(order_id:string) {
        const token = getCookieClient();

        const data = {
            order_id: order_id,
        }
    try{
        await api.put("/order/finish", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch(err){
        console.log(err);
        toast.error("Falha ao finalizar este pedido")
        return;
    }

        toast.success("Pedido finalizado com sucesso!")
        router.refresh();
        setIsOpen(false);
    }
    
    // <<< NOVA FUNÇÃO: Atualiza o status do item no Backend e no Estado Local >>>
    async function updateItemStatus(itemId: string) {
        const token = getCookieClient();

        const data = {
            item_id: itemId,
        };

        try {
            // 1. Chama o endpoint PUT para atualizar no banco de dados
            const response = await api.put("/order/item/status", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedItem = response.data as OrderItemProps;

            // 2. Atualiza o estado local 'order'
            setOrder(prevOrder => 
                prevOrder.map(item => 
                    item.id === itemId 
                        ? { ...item, status: updatedItem.status } // Atualiza apenas o status
                        : item
                )
            );
            
            toast.success(`Item "${updatedItem.product.name}" concluído!`);
            
        } catch (err) {
            console.error(err);
            toast.error("Falha ao concluir o item.");
        }
    }


    return(
        <OrderContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                finishOrder,
                order,
                updateItemStatus // Exportando a nova função
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}