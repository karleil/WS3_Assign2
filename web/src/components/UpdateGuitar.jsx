import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './UpdateGuitarContent';
import g from '../global.module.css';

function UpdateGuitar( {onTapeUpdated, tape} ) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className={`${g['button']} ${g['small']} ${g['warning']}`} onClick={() => setShowModal(true)}>Edit</button>      
      {/* 
        Pass down the function to get all the tapes from the API
          @NOTE createPortal will render the ModalContent component outside of it's parent component. Here we are rendering it in the document.body 
      */}
      {showModal && createPortal( <ModalContent onTapeUpdated={onTapeUpdated} tape={tape} onClose={() => setShowModal(false)} /> ,document.body)}
    </>
  );
}

export default UpdateGuitar;