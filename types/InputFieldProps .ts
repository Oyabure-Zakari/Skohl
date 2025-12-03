type InputFieldProps = {
  iconType: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (prevState: string) => string;
};

export default InputFieldProps;