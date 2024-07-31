import { Form, Switch } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CustomSwitchProps<T extends FieldValues> {
  control: Control<T>;
  field: Path<T>;
  error?: string;
  label?: string;
}

export const CustomSwitch = <T extends FieldValues>({
  control,
  field,
  error,
  label,
}: CustomSwitchProps<T>) => {
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
          <Switch
            checked={renderField.value}
            onChange={(checked) => renderField.onChange(checked)}
          />
        </Form.Item>
      )}
    />
  );
};
