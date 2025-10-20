"use client"
import { ChangeEvent, useState } from "react"
import styles from './styles.module.scss'
import { UploadCloud } from "lucide-react"
import Image from "next/image"
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

export function Form() {
    const router = useRouter()
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function handleRegisterIngredient(formData: FormData) {

        const name = formData.get("name")
        const price = formData.get("price")
        const isExtraChecked = formData.get("IsExtra")

        if (!name || !price || !image) {
            toast.warning("Preencha todos os campos")
            return;
        }

        const data = new FormData();

        data.append("name", name)
        data.append("price", price)
        data.append("file", image)
        data.append("extra", isExtraChecked ? 'true' : 'false')

        const token = getCookieClient();

        await api.post("/ingredient", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            toast.success("Ingrediente Registrado com Sucesso")
            setImage(undefined);
            setPreviewImage("");
        })
        .catch((err) => {
            console.log(err);
            toast.warning("Falha ao Cadastrar este Ingrediente")
            return;
        });

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.type !== 'image/png') {
                toast.warning("Formato não Permitido! Apenas PNG.");
                return;
            }

            setImage(file);
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    return (
        <main className={styles.container}>
            <h1>Novo ingrediente</h1>

            <form className={styles.form} action={handleRegisterIngredient}>

                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#7a7a7aff" />
                    </span>

                    <input
                        type="file"
                        accept="image/png"
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt="Imagem de preview"
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="Nome do ingrediente..."
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name="price"
                    placeholder="Preço adicional..."
                    required
                    className={styles.input}
                />

                <label htmlFor="isExtra">
                    <input type="checkbox" name="extra"  id= "extra"/> O ingrediente é extra?
                </label>
                <Button name="Cadastrar ingrediente" />

            </form>
        </main>
    )
}