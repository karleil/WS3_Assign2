import { useState } from 'react';
import { createPortal } from 'react-dom';
import UpdateGuitarContent from './UpdateGuitarContent';
import g from '../global.module.css';

// same as AddGuitar
function UpdateGuitar( {onTapeUpdated, guitar} ) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className={`${g['button']} ${g['small']} ${g['warning']}`} onClick={() => setShowModal(true)}>Edit</button>      
      {showModal && createPortal( <UpdateGuitarContent onTapeUpdated={onTapeUpdated} guitar={guitar} onClose={() => setShowModal(false)} /> ,document.body)}
    </>
  );
}

export default UpdateGuitar;