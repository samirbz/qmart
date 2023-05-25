import styles from './page.module.css'
import Navbar from '@/components/Navbar'
import ProductList from '../pages/productView/page'


export default function Home() {
  return (
    <>
      <div className={styles.body}>
        <Navbar />
        <ProductList />
      </div>

    </>
  )
}
