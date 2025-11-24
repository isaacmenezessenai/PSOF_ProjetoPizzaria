"use client"

import Link from "next/link";
import styles from './styles.module.scss'
import Image from "next/image";
import logoImg from '/public/logo.svg'
import { LogOutIcon, Bell } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useContext } from "react";
import { NotificationContext } from "@/providers/notification"; 
import { HelpModal } from "../modal/helpModal";

export function Header(){
    const router = useRouter();
    const { notifications, toggleModal, isOpen } = useContext(NotificationContext);

    async function handleLogout() {
        deleteCookie("session", {path:"/"})
        toast.success("Logout Realizado com Sucesso!")
        router.replace("/")
    }

    return(
        <>
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href="/dashboard">
                <Image
                alt="Logo Sujeito Pizza"
                src={logoImg}
                width={190}
                height={60}
                priority={true}
                quality={100}
                />
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link href="/dashboard/category">
                    Categoria
                </Link>
                <Link href="/dashboard/product">
                    Produto
                </Link>

                <button 
                    onClick={toggleModal} 
                    style={{ background: 'transparent', border: 0, position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <Bell size={24} color="#000000" /> 
                    {notifications.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: '#FF3F4B',
                            color: '#FFF',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>
                            {notifications.length}
                        </span>
                    )}
                </button>

                <form action={handleLogout}>
                    <button type='submit'>
                        <LogOutIcon size={24} color="#000000"/>
                    </button>
                </form>
            </nav>
        </div>
        </header>

        {isOpen && <HelpModal />}
        </>
    )
}