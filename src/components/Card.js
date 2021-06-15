import CurrentUserContext from "../context/CurrentUserContext";
import { useContext } from "react";

const Card = ({ card, onCardClick, onConfirmPopup }) => {
  const currentUserId = useContext(CurrentUserContext)._id
  const handleClick = () => {
    onCardClick(card)
  }

// проверка своей карточки
const isOwn = card.owner.id === currentUserId;
const isLiked = card.likes.some(i => i._id === currentUserId)

  return (
    <li className="card">
      <button onClick={onConfirmPopup} type="button" className={`card__delete ${isOwn ? 'card__delete_my' : ''}`}></button>
      <img className="card__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-cont">
          <button type="button" className={`card__like ${isLiked ? 'card__like_active' : ''}`}></button>
          <span className="card__likes-container">{card.likes.lenght} </span>
        </div>
      </div>
    </li>
  )
}

export default Card