import Modal from 'react-modal';
import stylModal from './ImageModal.module.css';

export default function ImageModal({isOpen, onClose, url, description}) {
    return (
            <Modal
                className={stylModal.modal}
                isOpen={isOpen}
                overlayClassName={stylModal.overlay}
                ariaHideApp={false}
                onRequestClose={onClose}
                shouldCloseOnEsc={true}
            >
                <img className={stylModal.img} src={url} alt={description} />          
            </Modal>
  );
}