import { captilizeWord } from "./captilizeWord";

  const formatFullName = (name: string): string => {
    return captilizeWord(name?.split(" ")[0]) + " " + captilizeWord(name?.split(" ")[1]);
  };

export default formatFullName;