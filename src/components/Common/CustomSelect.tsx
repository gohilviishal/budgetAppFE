import { Form, Select } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>;
  field: Path<T>;
  error?: string;
  label?: string;
  options: { value: string | number; label: string }[];
}

export const CustomSelect = <T extends FieldValues>({
  error,
  control,
  field,
  label,
  options,
}: CustomSelectProps<T>) => {
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
          <Select {...renderField}>
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    />
  );
};
