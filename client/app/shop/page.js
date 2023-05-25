'use client'
import { useRouter } from "next/navigation";

const Shop = () => {
    const router = useRouter();
    return (
        <>
            <h1>Shop page</h1>
            <button onClick={() => router.push("/shop/cart")}>Go to Cart</button>
        </>
    )
}
export default Shop;