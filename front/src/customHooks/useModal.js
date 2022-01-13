import { useState } from "react";

const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const [fileUrl, setFileUrl] = useState(null);
  const[form, setForm] = useState({detail: '', imagen: '', id: ''}) 
  const [counter, setCounter] = useState(0);

    const handleCounter = (event) =>{
        if(counter < 0){
          setCounter(0)
        } else if(event.keyCode === 8){
          setCounter(counter - 1)
        } else{
          setCounter(counter + 1)
        }
      }


  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setFileUrl(null);
    setForm(null);
    setCounter(0);
  }

  const back= () =>{
    setFileUrl(null)
  }

  const processImage =(event) =>{
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl)
 }

 const handleChange = (e) => {
  setForm({
      ...form,
      [e.target.name]: e.target.value
  })
}

const handleReset =() =>{
  setForm({detail: '', imagen: '', id: ''})
}


const handleSubmit = (e) =>{
  e.preventDefault()
  handleReset()
}


  return [isOpen, openModal, closeModal, fileUrl, processImage, form, handleChange, handleSubmit, counter, handleCounter, back];
};

export default useModal