import { Form, Input } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  field: Path<T>;
  error?: string;
  label?: string;
  type?: string;
}

export const CustomInput = <T extends FieldValues>({
  error,
  control,
  field,
  label,
  type = "text",
}: CustomInputProps<T>) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && ["e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <Controller
      name={field}
      control={control}
      render={({ field: renderField }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error}
        >
          <Input {...renderField} type={type} onKeyDown={handleKeyDown} />
        </Form.Item>
      )}
    />
  );
};
