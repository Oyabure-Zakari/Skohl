import { TextInput } from "react-native";

type InputFieldProps = {
  textInputRef: React.RefObject<TextInput | null>;
  iconType: string;
  placeholder: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  secureTextEntry?: boolean;
  onChangeText: (prevState: string) => string;
  togglePasswordVisibility?: () => void;
};

export default InputFieldProps;