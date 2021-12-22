
import Announment from '../../conponent/Announment/Announment'
import Categories from '../../conponent/Category/Categories'
import Footer from '../../conponent/Footer/Footer'
import Narbar from '../../conponent/Narbar/Narbar'
import NewsLetter from '../../conponent/NewsLetter/NewsLetter'
import Product from '../../conponent/Product/Product'
import Slider from "../../conponent/Slider/Slider"

const Home = () => {
    return (
        <div>
            <Announment/>
            <Narbar/>
            <Slider/>
            <Categories/>
            <Product/>
            <NewsLetter/>
            <Footer/>
        </div>
    )
}

export default Home
