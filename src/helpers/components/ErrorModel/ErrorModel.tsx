import React from 'react';

const ErrorModal : React.FC<{ errorMessage:string, onClose:any }> = ({ errorMessage, onClose }) => {
  // Render the modal with the error message
  return (
    <div className="modal bg-red-500  absolute right-0 top-0 rounded-2xl text-white font-[500] shadow-xl z-50">
      <div className="modal-content p-6 pr-16 relative">
        <p>{errorMessage}</p>
        <button onClick={onClose} className='absolute right-2 top-2 bg-red-500 rounded-full  p-[5px] hover:bg-red-200 ease-linear duration-100'>
          <svg fill="#000" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  
              viewBox="0 0 490 490">
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
              489.292,457.678 277.331,245.004 489.292,32.337 "/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
