import React,{useState,  useEffect} from 'react'
import PetItem from './PetItem';

export const Page = () => {
  const getLocalStorage = (type) => {
    return localStorage.getItem(type)? JSON.parse(localStorage.getItem(type)):[]
  }
  const [petsArray, setPetsArray] = useState(getLocalStorage('pets'));
  const [foodsArray, setFoodsArray] = useState(getLocalStorage('food'));
  const [plantsArray, setPlantsArray] = useState(getLocalStorage('plants'));
  const [unique, setUnique] = useState(false);
  // const [adsAuthors, setAdsAuthors] = useState([]);

  const getUniqueValuesOneArray = (arr, category) => {
    const ids = arr.map(item => item.id)
    const uniqueIds = [...new Set(ids)]
    const uniqueArray = uniqueIds.map(uniqueId => arr.find(item=>item.id === uniqueId))
    switch (category) {
      case ('pets'):
        setPetsArray(uniqueArray)
      case ('food'):
        setFoodsArray(uniqueArray)
      case ('plants'):
        setPlantsArray(uniqueArray)
      default:
        return
    }
  }

  const getUniqueValuesAllArrays = () => {
    getUniqueValuesOneArray(petsArray,'pets')
    getUniqueValuesOneArray(foodsArray,'food')
    getUniqueValuesOneArray(plantsArray,'plants')
    
  }

  const getCategory = async (e) => {
    const id = e.target.dataset.click 
    const categoryType = e.target.textContent
    const url = `https://run.mocky.io/v3/${id}`
    const data =  await fetch(url)
    const response = await data.json()
    if (categoryType.startsWith('PETS')) {
      setPetsArray(response)
      localStorage.setItem("pets", JSON.stringify(response));
    }
    else if (categoryType.startsWith('FOOD')) {
      setFoodsArray(response)
      localStorage.setItem("food", JSON.stringify(response));
    }else if(categoryType.startsWith('PLANTS')){
      setPlantsArray(response)
      localStorage.setItem("plants", JSON.stringify(response));
    }
  }

  const handleCheckbox = () => {
    setUnique(!unique)
    
  }
  useEffect(() => {
    if (unique) {
      getUniqueValuesAllArrays()
    } else {
      setPetsArray(getLocalStorage('pets'));
      setFoodsArray(getLocalStorage('food'));
      setPlantsArray(getLocalStorage('plants'));
    }
  }, [unique]);

  return (
    <main className="page-wrapper">
      <h1 className="campaign-title">
        Pets Campaign
      </h1>
      <div className="checkbox-control">
        <label htmlFor="unique">Unique items</label>
        <input type="checkbox" name='unique' id='unique' checked={unique} onChange={handleCheckbox}/>
      </div>
      <section className="campaigns">
        <div className="campaign-wrapper">
          <span onClick={getCategory} className="button active" data-click="8afd1f5a-c999-4935-8291-412ea8756f1d">
            PETS CAMPAIGN
          </span>
          
          {petsArray.map(pet => {
            return <PetItem key={pet.id+
              Math.random()} {...pet}/>
          })}
        </div>
        <div className="campaign-wrapper">
          <span onClick={getCategory} className="button" data-click="facf1e61-24ff-41c9-afc8-54837ab17327">
            FOOD CAMPAIGN
                </span>
          {foodsArray.map(pet => {
            return <PetItem key={pet.id+
              Math.random()} {...pet}/>
          })}
          
        </div>
        <div className="campaign-wrapper">
          <span onClick={getCategory} className="button" data-click="f21695d8-64ec-40c0-9830-9310919533ec">
            PLANTS CAMPAIGN
          </span>
          {plantsArray.map(pet => {
            return <PetItem key={pet.id+
              Math.random()} {...pet}/>
          })}
        </div>
      </section>
    </main>
  
  );
}