import styles from './page.module.css'
import Admin from '../pages/admin/page'
import Navbar from '@/components/Navbar'
import ProductList from '../pages/productList/page'


export default function Home() {
  return (
    <>
      <div className={styles.body}>
        <Navbar />
        <Admin />
        <ProductList />
      </div>

    </>
  )
}
