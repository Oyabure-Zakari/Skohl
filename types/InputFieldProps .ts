type InputFieldProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (prevState: string) => string;
};

export default InputFieldProps;