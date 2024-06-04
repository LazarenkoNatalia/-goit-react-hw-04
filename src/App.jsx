import { useState, useEffect } from 'react'
 import toast, { Toaster } from 'react-hot-toast'; 
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//  import './App.css'
import {getPhotosApi} from './api/apiUnsplash.js'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import Loader from './components/Loader/Loader.jsx'
import ErrorMassege from './components/ErrorMessage/ErrorMessage.jsx'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx'
import ImageGallery from './components/ImageGallery/ImageGallery.jsx'
import ImageModal from './components/ImageModal/ImageModal.jsx'

const modalInitParams = {
  isOpen: false,
  url: '',
  description: '',
};


function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoader, setIsLoader] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoadMoreBtn, setIsLoadMoreBtn] = useState(false)
  const [page, setPage] = useState(1)
  const [modalParams, setModalParams] = useState(modalInitParams);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
    // console.log(query)
    setPhotos([])
    setPage(1)
    setIsError(false)
  };
  
 const handlePhotoClick = (url, description) => {
        setModalParams({ isOpen: true, url, description });
    };

    const handleModalClose = () => {
        setModalParams(modalInitParams);
  };   

   const handleClickMore = () => {
        setPage(page + 1);
    };

  // const query = 'cat'
  // const page = 1
 
  useEffect(() => {
        if (query === '') {
            return;
        }

   async function getData() {
     try
     {
       setIsError(false)
       setIsLoader(true)
       const { results, total_pages } = await getPhotosApi(query, page);
      //  console.log(results)
      //  console.log(total_pages)
       setPhotos(prevPhotos => {
                return [...prevPhotos, ...results];
                });
   if (total_pages === 0) {toast.error('Nothing was found for your request')}          
   (total_pages>0 && page<total_pages)? setIsLoadMoreBtn(true):setIsLoadMoreBtn(false)
     }
     catch {
       setIsError(true)
   setIsLoadMoreBtn(false)
     }
   finally {
     setIsLoader(false)
   }
         }

    getData();
   }, [ query, page ]
  );
  
 useEffect(() => {
        if (page === 1) return;
  
window.scrollBy({
      top: 550,
      behavior: 'smooth',
      });
 }, [photos, page]);

  return <>
    <SearchBar onSearch={handleSearch} />
     <Toaster position="top-left" /> 
    {isLoader && <Loader />}
    {isError && <ErrorMassege />}

 {photos.length > 0 && (
                <ImageGallery cards={photos} onPhotosClick={handlePhotoClick} />
            )}

    {photos.length > 0 && !isLoader && isLoadMoreBtn && <LoadMoreBtn handleClickMore={handleClickMore} />}
  
  
    {modalParams && (
                    <ImageModal
                        url={modalParams.url}
                        description={modalParams.description}
                        isOpen={modalParams.isOpen}
                        onClose={handleModalClose}
                    />
                )}
  </>

    }

export default App
