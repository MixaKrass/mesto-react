import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import {useState } from "react";
import PopupWithForm from "./components/PopupWithForm";
import PopupImage from "./components/PopupImage";
import PopupConfirm from "./components/PopupConfirm";




function App() {
  const [isEditProfilePopupOpen ,setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ isOpened: false})
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)

  //обработчик картинки
  const handleCardClick = ({link, name, isOpened}) => {
    setSelectedCard({link, name, isOpened: !isOpened})
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
    setIsEditAvatarPopupOpen (false)
    setIsEditProfilePopupOpen (false)
    setIsAddPlacePopupOpen (false)
    setSelectedCard({ isOpened: false})
    setIsConfirmPopupOpen (false)
  }

  return (
<div className="body">
  <div className="page">
    <Header />
      < Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onConfirmPopup={handleConfirmPopupClick}
      />       
    <Footer />
  </div>

    <PopupWithForm
      name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} container="popup__container popup__form" onClose={closeAllPopups}>
      <input type="text" className="popup__input" name="input-name" id="input__popup-name" minLength="2" maxLength="40"  placeholder="Имя" required />
        <span id="input__popup-name-error" className="popup__error" />
        <input type="text" className="popup__input" name="input-about" id="input__popup-about" minLength="2" maxLength="200" placeholder="Вид деятельности" required />
        <span id="input__popup-about-error" className="popup__error" />
    </PopupWithForm>

    <PopupWithForm
      name="add" title="Новое место" isOpen={isAddPlacePopupOpen} container="popup__container popup__form" onClose={closeAllPopups}>
      <input name="InputNameCard" type="text" id="input__popup-CardName" className="popup__input" placeholder="Название места" minLength="2" maxLength="40" required />
      <span id="input__popup-CardName-error" className="popup__error" />
      <input type="url" className="popup__input" name="InputImgCard" id="input__popup-CardImg" placeholder="ссылка на картинку" required />
      <span id="input__popup-CardImg-error" className="popup__error" />
    </PopupWithForm>

    <PopupWithForm 
      name="refresh" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} container="popup__container popup__form" onClose={closeAllPopups}>
      <input type="url" className="popup__input" name="avatar"  id="input__popup-avatar"  placeholder="Ссылка на аватар" required />
      <span id="input__popup-avatar-error" className="popup__error" />
    </PopupWithForm>

    <PopupConfirm 
    name="sure" title="Вы уверены?" isOpen={isConfirmPopupOpen} onClose={closeAllPopups} >

    </PopupConfirm>


    <PopupImage onClose={closeAllPopups} card={selectedCard} />

  </div>
  );
}

export default App;