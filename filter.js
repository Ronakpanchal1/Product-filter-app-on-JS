
import data from './data.json' assert {type : "json"} 


const productsContainer = document.querySelector(".products")
const searchInput = document.querySelector(".search")
const categoriesContainer = document.querySelector(".cats")
const priceRange = document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")


const displayedProducts = (filtererdProducts) => {
  productsContainer.innerHTML = filtererdProducts.map(
      (product) =>
            `
            <div class="product">
                <img src= ${product.image} alt="###">
                <span class="name">${product.title}</span>
                <span class="priceText">$${product.price}</span>
            </div>
            `
    )
    .join("");
};

displayedProducts(data)

searchInput.addEventListener("keyup",(e)=>{
    const value = e.target.value.toLowerCase()

    if(value){
        displayedProducts(data.filter((item)=>{
            return item.title.toLowerCase().indexOf(value) !== -1
        }))
    }
    else{
        displayedProducts(data)
    }

    if( !productsContainer.innerHTML){
      productsContainer.style.background = "#f7f3f3"
      productsContainer.style.height = "100vh"
      productsContainer.style.display = "flex"
      productsContainer.style.alignItems = "center"
      productsContainer.style.justifyContent = "center"
      productsContainer.innerHTML = `<h1>No such product found</h1>`
    }
})

const setCategories = ()=>{
    const allCats = data.map(item=> item.category)
     
    const categories = [
      "All",
      ...allCats.filter((item,i)=>{
          return allCats.indexOf(item) === i
      })]
    
      categoriesContainer.innerHTML = categories.map((cat)=>{
        return `<span class='cat'>${cat}</span>`
      }).join("")


      categoriesContainer.addEventListener("click",(e)=>{
        const selectedCat = e.target.textContent;
        selectedCat ==="All"?
        displayedProducts(data):
        displayedProducts(data.filter((item)=>{
          return item.category === selectedCat
        }))
      })

      const setPrices = ()=>{
        const priceList = data.map( item => item.price )
        const minPrice = Math.min(...priceList)
        const maxPrice = Math.max(...priceList)


        priceRange.min = minPrice
        priceRange.max = maxPrice
        priceRange.value = maxPrice
        priceValue.textContent = "$" + maxPrice

        priceRange.addEventListener("input",(e)=>{
          priceValue.textContent = "$" + e.target.value
          displayedProducts(data.filter(((item) => {
            let filteredData =  item.price <= e.target.value
            return filteredData
          })))
        })
      }
      setPrices()

}
setCategories()





