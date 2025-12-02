import Image from "next/image"
import divisoriaImg from '../../../public/divider.svg'
import Link from "next/link"
import styles from "../page.module.scss"
import logoImg from '../../../public/logo.svg'
import { api } from '@/services/api'
import { redirect } from "next/navigation"


interface JobRole {
    id: string;
    role_name: string; 
}


function formatToISODate(dateString: string): Date {
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0); 
    return date;
}


export default async function Signup() { 
    
    // 1. CARREGAR OS CARGOS (Job Roles)
    let jobRoles: JobRole[] = [];
    let fetchError = false;

    try {
        const response = await api.get('/jobroles');
        jobRoles = response.data;
    } catch (error) {
        console.error("Erro ao carregar os cargos:", error);
        fetchError = true;
    }

    // 2. FUNÇÃO SERVER ACTION PARA REGISTRO
    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const cpf = formData.get("cpf") as string
        const dataNascimentoString = formData.get("dataNascimento") as string
        const jobRoleId = formData.get("jobRoleId") as string 

        if (name === "" || email === "" || password === "" || cpf === "" || dataNascimentoString === "" || jobRoleId === "") {
            console.log("PREENCHA TODOS OS CAMPOS")
            return; 
        }
        
        if (jobRoleId === "") {
            console.log("Selecione um Cargo válido.")
            return;
        }

        let dataNascimento: Date;
        try {
            dataNascimento = formatToISODate(dataNascimentoString); 
        } catch (error) {
            console.log("Data de Nascimento inválida");
            return;
        }

        try {
            await api.post("/users/employee", {
                name,
                email,
                password,
                cpf,
                dataNascimento,
                jobRoleId 
            })
        } catch (err: any) {
            console.log("Erro ao cadastrar usuário:")
            if (err.response && err.response.data) {
                console.log(err.response.data); 
            } else {
                console.log(err);
            }
            console.log("erro")
            console.log(err)
            return; 
        }

        redirect("/")
    }

    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerCenterSignUp}>
                    <Image
                        src={logoImg}
                        alt="Logo da pizzaria"
                    />

                    <section className={styles.signUp}>
                        <form action={handleRegister}>
                            {/* Inputs existentes */}
                            <input
                                type='text'
                                required
                                name='name'
                                placeholder='Digite seu nome...'
                                className={styles.input}
                            />

                            <input
                                type='email'
                                required
                                name='email'
                                placeholder='Digite seu email...'
                                className={styles.input}
                            />

                            <input
                                type='text'
                                required
                                name='cpf'
                                placeholder='Digite seu CPF...'
                                className={styles.input}
                                maxLength={14}
                            />

                            <input
                                type='date'
                                required
                                name='dataNascimento'
                                placeholder='Data de Nascimento'
                                className={styles.input}
                            />

                            <input
                                type='password'
                                required
                                name='password'
                                placeholder='***********'
                                className={styles.input}
                            />
                            
                            {/* NOVO: Dropdown para Job Role ID */}
                            <select
                                name='jobRoleId'
                                required
                                className={styles.input} 
                                
                                disabled={fetchError || jobRoles.length === 0} 
                            >
                                <option value="" disabled selected>
                                    {fetchError ? 'Erro ao carregar cargos' : 'Selecione o Cargo...'}
                                </option>

                                {jobRoles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>


                            <button type='submit'>
                                Cadastrar
                            </button>
                        </form>

                        <Link href="/" className={styles.text}>
                            Já possui uma conta? Faça o login
                        </Link>

                    </section>
                </div>
            </div>
        </>
    )
}