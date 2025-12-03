import { useState } from "react";

const useTogglePasswordVisibility=() => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const togglePasswordVisibility = () => {
    setIsPasswordHidden((prevState) => !prevState);
  };

  return {isPasswordHidden, togglePasswordVisibility}
}

export default
useTogglePasswordVisibility