import styles from './page.module.css'
import Navbar from '@/app/components/Navbar'
import ProductList from './productView/page'
import Admin from './admin/page'



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
