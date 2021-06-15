import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import Card from "../components/Card";
import CurrentUserContext from "../context/CurrentUserContext";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onConfirmPopup }) => {
  const currentUserId = useContext(CurrentUserContext)._id
  const [cards, setCards] = useState([])
  const { name, about, avatar} = useContext(CurrentUserContext)

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data)
    })
      .catch(err => console.log(err))
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUserId);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

// удаление карточки
const handleCardDelete = (cardId) => {
  api.removeCard(cardId).then(() => {
    setCards((state) => state.filter(c => c._id !== cardId))
  })
}


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
        {cards.map(card => (<Card key={card._id} card={card} onCardClick={onCardClick} onConfirmPopup={onConfirmPopup} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />))}
      </section>
    </main>
  )
}
export default Main