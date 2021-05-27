import {useEffect, useState} from "react";
import api from "../utils/Api";
import Card from "../components/Card";

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onConfirmPopup}) => {
  const [userAvatar, setUserAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getUserInfo().then(({name, about, avatar}) => {
      setUserName(name)
      setUserDescription(about)
      setUserAvatar(avatar)
    })
    api.getInitialCards().then((data) => {
      setCards(data)
    })
  }, [])



  return(
      <main className="main">
        <section className="profile">
          <div className="profile__image">
            <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
              <button onClick={onEditAvatar} type="button" className="profile__overlay"  ></button>
            </div>
            <div>
              <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <button onClick={onEditProfile} type="button" className="profile__edit">
                </button>
              </div>
              <p className="profile__about">{userDescription}</p>
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