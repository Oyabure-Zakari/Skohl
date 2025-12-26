  const isProductFormValid = (photo: string, productNameRef: string, productPriceRef: string, productDescriptionRef: string, selectedProductCategory: string) => {
    if (!photo) {
      throw new Error ("Please add a photo");
    }
    if (
      !productNameRef.trim() ||
      !productPriceRef.trim() ||
      !productDescriptionRef.trim() ||
      !selectedProductCategory
    ) {
      throw new Error ("All fields are required");
    }

    return true;
  };  

export default isProductFormValid;