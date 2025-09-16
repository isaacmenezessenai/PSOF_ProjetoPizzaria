"use client"

import { ChangeEvent, useEffect, useState } from "react"
import styles from './styles.module.scss'
import { UploadCloud, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"


interface CategoryProps {
    id: string;
    name: string;
}

interface IngredientProps {
    id: string;
    name: string;
    banner: string;
    price: number;
}

interface SelectedIngredientProps extends IngredientProps {
    amount: number;
}

interface Props {
    categories: CategoryProps[]
}

export function Form({ categories }: Props) {
    const router = useRouter();

    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");
    

    const [allIngredients, setAllIngredients] = useState<IngredientProps[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredientProps[]>([]);


    useEffect(() => {
        async function fetchIngredients() {
            try {
                const token = getCookieClient();
                const response = await api.get('/ingredients', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAllIngredients(response.data);
            } catch (err) {
                console.error("Erro ao carregar ingredientes:", err);
                toast.error("Falha ao carregar a lista de ingredientes.");
            }
        }
        fetchIngredients();
    }, []);

    async function handleRegisterProduct(formData: FormData) {
        const categoryIndex = formData.get("category");
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");

        if (!name || !categoryIndex || !price || !description || !image) {
            toast.warning("Preencha todos os campos do produto!");
            return;
        }

        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("category_id", categories[Number(categoryIndex)].id);
        data.append("file", image);

        const token = getCookieClient();

        try {
            // Passo 1: Cadastrar o produto
            const response = await api.post("/product", data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const productId = response.data.id;


            for (const ingredient of selectedIngredients) {
                const ingredientData = {
                    productId,
                    ingredientId: ingredient.id,
                    amount: ingredient.amount,
                };
                await api.post("/product/ingredient", ingredientData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            toast.success("Produto e ingredientes registrados com sucesso!");
            router.push("/dashboard");

        } catch (err) {
            console.error(err);
            toast.error("Falha ao cadastrar o produto ou os ingredientes.");
        }
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                toast.warning("Formato não permitido!");
                return;
            }
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    function handleSelectIngredient(ingredient: IngredientProps, action: 'add' | 'remove') {
        setSelectedIngredients(prev => {
            const existing = prev.find(item => item.id === ingredient.id);

            if (action === 'add') {
                if (existing) {
                    return prev.map(item => item.id === ingredient.id ? { ...item, amount: item.amount + 1 } : item);
                } else {
                    return [...prev, { ...ingredient, amount: 1 }];
                }
            } else { 
                if (existing && existing.amount > 1) {
                    return prev.map(item => item.id === ingredient.id ? { ...item, amount: item.amount - 1 } : item);
                } else {
                    return prev.filter(item => item.id !== ingredient.id);
                }
            }
        });
    }

    return (
        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>
                {/* Campos do produto */}
                <label className={styles.labelImage}>
                    <span><UploadCloud size={30} color="#8a8a8a" /></span>
                    <input type="file" accept="image/png,image/jpeg" required onChange={handleFile} />
                    {previewImage && (
                        <Image alt="Preview" src={previewImage} className={styles.preview} fill={true} quality={100} priority={true} />
                    )}
                </label>
                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>{category.name}</option>
                    ))}
                </select>
                <input type="text" name="name" placeholder="Nome do produto..." required className={styles.input} />
                <input type="text" name="price" placeholder="Preço do produto..." required className={styles.input} />
                <textarea className={styles.input} placeholder="Descrição do produto..." required name="description"></textarea>

                {/* Seção de Ingredientes */}
                <div className={styles.ingredientSection}>
                    <div className={styles.ingredientHeader}>
                        <h2>Ingredientes</h2>
                        <button type="button" onClick={() => router.push("/dashboard/ingredient")}>
                            Novo Ingrediente
                        </button>
                    </div>

                    {/* Lista de ingredientes disponíveis */}
                    <ul className={styles.ingredientList}>
                        {allIngredients.map(ingredient => (
                            <li key={ingredient.id} className={styles.ingredientItem}>
                                <div className={styles.ingredientInfo}>
                                    <Image src={ingredient.banner} alt={ingredient.name} width={50} height={50} />
                                    <span>{ingredient.name}</span>
                                    <span>R$ {ingredient.price }</span>
                                </div>
                                <div className={styles.ingredientActions}>
                                    <button type="button" onClick={() => handleSelectIngredient(ingredient, 'remove')}><Minus size={16} /></button>
                                    <span>
                                        {selectedIngredients.find(item => item.id === ingredient.id)?.amount || 0}
                                    </span>
                                    <button type="button" onClick={() => handleSelectIngredient(ingredient, 'add')}><Plus size={16} /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button name="Cadastrar produto" />
            </form>
        </main>
    )
}