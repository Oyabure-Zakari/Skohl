type InputFieldProps = {
  iconType: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (prevState: string) => string;
  togglePasswordVisibility?: () => void;
};

export default InputFieldProps;