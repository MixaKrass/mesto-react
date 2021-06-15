import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import Card from "../components/Card";
import CurrentUserContext from "../context/CurrentUserContext";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onConfirmPopup }) => {
  const [cards, setCards] = useState([])
  const { name, about, avatar} = useContext(CurrentUserContext)

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data)
    })
      .catch(err => console.log(err))
  }, [])



  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image">
          <div className="profile__avatar" style={{ backgroundImage: `url(${avatar})` }}>
            <button onClick={onEditAvatar} type="button" className="profile__overlay"  ></button>
          </div>
          <div>
            <div className="profile__info">
              <h1 className="profile__name">{name}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit">
              </button>
            </div>
            <p className="profile__about">{about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add"></button>
      </section>

      <section className="cards">
        {cards.map(card => (<Card key={card._id} card={card} onCardClick={onCardClick} onConfirmPopup={onConfirmPopup} />))}
      </section>
    </main>
  )
}
export default Main