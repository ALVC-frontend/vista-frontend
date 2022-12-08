type Props = {
  placeholder: string;
  inputType: string;
  value?: any;
};

const TextInput = ({ placeholder, inputType, value }: Props) => {
  return (
    <div className="w-full">
      <input
        value={value}
        type={inputType}
        className="outline-none border-none focus:outline-none focus:border-none w-full bg-lightGray p-3 rounded-md"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
