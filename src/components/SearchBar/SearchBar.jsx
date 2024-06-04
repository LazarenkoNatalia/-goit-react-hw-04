
import { HiMagnifyingGlass } from "react-icons/hi2";
import stylSearch from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast'; 




export default function SearchBar({ onSearch }) {
    const handleSubmitForm = (event) => {
        event.preventDefault();
        // console.log(event.target.elements.searchPhotos.value)
        const myquery = event.target.elements.searchPhotos.value;
        myquery.trim() === '' ? toast.error('Please enter key words for search') : onSearch(myquery);
        event.target.reset();
    };
    
    return (
        <header className={stylSearch.header}>
             <Toaster position="top-left" /> 
            <form  onSubmit={handleSubmitForm}>
                <input className={stylSearch.formInput}
                    name="searchPhotos"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
               
            <button className={stylSearch.formBtn} type="submit">
                <HiMagnifyingGlass className={stylSearch.icon} />
            </button>

            </form>
        </header>
    );
}



