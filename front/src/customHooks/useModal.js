import { useState } from "react";

const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const [fileUrl, setFileUrl] = useState(null);
  console.log(fileUrl)


  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setFileUrl(null)
  }

  const processImage =(event) =>{
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl)
 }

  return [isOpen, openModal, closeModal, fileUrl, processImage];
};

export default useModal