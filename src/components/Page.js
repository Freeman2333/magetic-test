import React,{useState, useRef, useEffect} from 'react'
import PetItem from './PetItem';

export const Page = () => {
  const getLocalStorage = (type) => {
    return localStorage.getItem(type)? JSON.parse(localStorage.getItem(type)):[]
  }
  const [petsArray, setPetsArray] = useState(getLocalStorage('pets'));
  const [foodsArray, setFoodsArray] = useState(getLocalStorage('food'));
  const [plantsArray, setPlantsArray] = useState(getLocalStorage('plants'));

  const getPetInfo = async (id) => {
    const url = `https://run.mocky.io/v3/${id}`
    const data =  await fetch(url)
    const response = await data.json()
    setPetsArray(response)
    localStorage.setItem("pets", JSON.stringify(response));
  }
  const getFoodInfo = async (id) => {
    const url = `https://run.mocky.io/v3/${id}`
    const data =  await fetch(url)
    const response = await data.json()
    setFoodsArray(response)
    localStorage.setItem("food", JSON.stringify(response));
  }
  const getPlantsInfo = async (id) => {
    const url = `https://run.mocky.io/v3/${id}`
    const data =  await fetch(url)
    const response = await data.json()
    setPlantsArray(response)
    localStorage.setItem("plants", JSON.stringify(response));
  }

  return (
    <main className="page-wrapper">
      <h1 className="campaign-title">
        Pets Campaign
            </h1>
      <section className="campaigns">
        <div className="campaign-wrapper">
          <span onClick={()=>getPetInfo("8afd1f5a-c999-4935-8291-412ea8756f1d")} className="button active" data-click="8afd1f5a-c999-4935-8291-412ea8756f1d">
            PETS CAMPAIGN
          </span>
          
          {petsArray.map(pet => {
            return <PetItem key={pet.id+
              Math.random()} {...pet}/>
          })}
        </div>
        <div className="campaign-wrapper">
          <span onClick={()=>getFoodInfo("facf1e61-24ff-41c9-afc8-54837ab17327")} className="button" data-click="facf1e61-24ff-41c9-afc8-54837ab17327">
            FOOD CAMPAIGN
                </span>
          {foodsArray.map(pet => {
            return <PetItem key={pet.id+
              Math.random()} {...pet}/>
          })}
          
        </div>
        <div className="campaign-wrapper">
          <span onClick={()=>getPlantsInfo("f21695d8-64ec-40c0-9830-9310919533ec")} className="button" data-click="f21695d8-64ec-40c0-9830-9310919533ec">
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