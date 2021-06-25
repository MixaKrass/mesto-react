import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopp";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ isOpened: false })
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrentUser(data)
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    api.getInitialCards()
    .then((data) => {
      setCards(data)
    }) 
    .catch(err => console.log(err))
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
} 


    // удаление карточки
    const handleCardDelete = (card) => {
    api.removeCard(card._id)
    .then(() => {
      setCards(state => state.filter(c => c._id !== card._id))
   })
   .catch(err => console.log(err));
  }

  //обработчик картинки
  const handleCardClick = ({ link, name, isOpened }) => {
    setSelectedCard({ link, name, isOpened: !isOpened })
  }


  // обработчики попапов (open/close)
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }
  const handleConfirmPopupClick = () => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({ isOpened: false })
    setIsConfirmPopupOpen(false)
  }

  // обработчик информации о пользователе
  const handleUpdateUser = (userData) => {
    console.log("Hello")
    api.patchProfileInfo(userData)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err));
  }

  // обновление аватара
  const handleUpdateAvatar = (newAvatar) => {
    api.newAvatar(newAvatar)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err));
  }

// добавление карточки
  const handleAddPlace = (data) => {
    api.patchCard(data)
    .then(newCard => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Header />
        < Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onConfirmPopup={handleConfirmPopupClick}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceClick}
        />
        <Footer />
      </div>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
     

      <AddPlacePopup isOpen={isAddPlacePopupOpen}  onClose={closeAllPopups} onAddPlace={handleAddPlace} > </AddPlacePopup>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} > </EditAvatarPopup>

      <PopupWithForm
        name="sure" title="Вы уверены?" isOpen={isConfirmPopupOpen} container="popup__container popup__form" onClose={closeAllPopups} >

      </PopupWithForm>


      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;