type Props = {
  placeholder: string;
  inputType: string;
  value?: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ placeholder, inputType, value, onChange }: Props) => {
  return (
    <div className="w-full">
      <input
        value={value}
        type={inputType}
        className="outline-none border-none focus:outline-none focus:border-none w-full bg-lightGray p-3 rounded-md"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
