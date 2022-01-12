import { useState } from "react";

const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const [fileUrl, setFileUrl] = useState(null);
  const [noFile, setNofile] = useState(null);
  console.log(fileUrl)


  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    const imageUrl = URL.createObjectURL(noFile);
    setNofile(imageUrl)
  }

  const processImage =(event) =>{
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl)
 }

  return [isOpen, openModal, closeModal, fileUrl, noFile, processImage];
};

export default useModal