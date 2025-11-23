import divisoria from '../../../../../public/divider.svg'
import styles from "./styles.module.scss"
import {Import, X} from 'lucide-react'
import {use} from 'react'
import { OrderContext } from "@/providers/order"
import { calculateTotalOrder } from "@/lib/helper"



export function Modalorder(){
    const {onRequestClose, order, finishOrder, updateItemStatus} = use (OrderContext) 

    
    const allItemsConcluded = order.every(item => item.status === true);

    
    async function handleFinishOrder() {
        // Verifica se a ordem existe antes de tentar acessar o ID
        if (order && order.length > 0 && order[0].order) {
            await finishOrder(order[0].order.id);
        }
    }

    // Função para marcar um item individual como concluído
    async function handleItemConclude(itemId: string) {
        await updateItemStatus(itemId); 
    }


    return(
        <dialog className={styles.dialogContainer}>
            
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color="#000000"/>
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    {/* Assumindo que a ordem tem itens */}
                    {order && order.length > 0 && (
                        <>
                            <span className={styles.table}>
                                Mesa <b>{order[0].order.table.number}</b>
                            </span>

                            {order[0].order?.name && (
                            <span className={styles.name}>
                                <b>{order[0].order.name}</b>
                            </span>
                            )}
                        </>
                    )}

                    {order.map(item => (
                    // O erro 'Property 'status' does not exist'
                    // será corrigido quando você atualizar o TIPO de 'item' no seu contexto.
                    <section className={styles.item} key={item.id}>
                        <span style={{ textDecoration: item.status ? 'line-through' : 'none' }}>
                            Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {parseFloat(item.product.price) * item.amount} 
                        </span>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className={styles.description}>
                                **Status:** {item.status ? 'CONCLUÍDO' : 'PENDENTE'}
                                {item.product.description && ` | ${item.product.description}`}
                            </span>
                            
                            {!item.status && (
                                <button 
                                    className={styles.buttonItemConclude} 
                                    onClick={() => handleItemConclude(item.id)}
                                >
                                    Concluir Item
                                </button>
                            )}
                        </div>
                    </section>
                    ))}

                    <h3 className={styles.total}>Valor Total: R$ {calculateTotalOrder(order)}</h3>

                    <button 
                        className={styles.buttonOrder} 
                        onClick={handleFinishOrder}
                        disabled={!allItemsConcluded} // Desabilita se for FALSE
                    >
                        Concluir pedido ({allItemsConcluded ? 'PRONTO' : 'PENDENTE'})
                    </button>

                </article>

            </section>

        </dialog>
    )
}