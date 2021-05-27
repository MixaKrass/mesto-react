const PopupConfirm = ({isOpen, onClose}) => {
  
  return(
    <div className={isOpen ? `popup popup_confirm popup_opened` : `popup popup_confirm` }>
      <form id='form_remove' className = "popup__container">
        <h2 className = "popup__title">Вы Уверены</h2>
        <button type = "submit" className = "popup__button" >Да</button>
      </form>
      <button onClick={onClose} type = "button" id = "close_remove" className = "popup__closed">
          
        </button>
    </div>

  )
}

export default PopupConfirm