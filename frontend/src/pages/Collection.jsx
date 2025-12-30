import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(prev => prev.filter(item => item !== size));
    } else {
      setSelectedSizes(prev => [...prev, size]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    productsCopy = productsCopy.filter(item => item.price <= maxPrice);

    if (selectedSizes.length > 0) {
      productsCopy = productsCopy.filter(item => item.sizes.some(size => selectedSizes.includes(size)));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, maxPrice, selectedSizes, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  },[sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>

        {/* Price Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">PRICE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 pr-5">
            {/* Range Slider */}
            <input
              type="range"
              min="0"
              max="10000"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between mt-2">
              <span>LKR 0</span>
              <span className="font-bold">LKR {maxPrice}</span>
            </div>
          </div>
        </div>

        {/* SIze Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">SIZE</p>

          <div className="flex flex-wrap gap-2 pr-5">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <p
                key={size}
                onClick={() => toggleSize(size)}
                className={`cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 transition-colors
                  ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {size}
                </p>
            ))}
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
