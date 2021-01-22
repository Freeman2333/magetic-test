import React, {useState} from 'react'

const PetItem = ({title,description,image}) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <section>
      <div className="ads-block">
        <div className="ads__image">
          <img src={image} alt="Doggo" />
        </div>
        <div className={showInfo ? "ads__info show-extra" : "ads__info"}>
          <h3>
            {title}
          </h3>
          {/* <input type="checkbox" name="trigger" id="trigger1" /> */}
          <label onClick={()=>setShowInfo(!showInfo)} className="trigger-arrow" htmlFor="trigger1">
            <span />
          </label>
          <div className="ads__info__extra">
            <p>
              {description}
                  </p>
            <div className="ads__action">
              <a className="button" href="#" style={{ display: 'inline' }}>
                Go for it!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PetItem
