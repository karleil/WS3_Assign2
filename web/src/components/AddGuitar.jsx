import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './AddGuitarContent';
import g from '../global.module.css';

function AddGuitar( {onTapeAdded} ) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className={g['button']} onClick={() => setShowModal(true)}>Add  +</button>      
      {showModal && createPortal( <ModalContent onTapeAdded={onTapeAdded} onClose={() => setShowModal(false)} /> ,document.body)}
    </>
  );
}

export default AddGuitar;