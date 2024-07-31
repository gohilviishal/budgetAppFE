import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Type } from "../enums";
import { Button, Form } from "antd";
import { CustomInput, CustomSelect, CustomSwitch, List } from "../components";
import { typeOptions } from "../utils";
import { useAddCategory } from "../hooks/categories/useAddCategory";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  type: yup
    .mixed<Type>()
    .oneOf(Object.values(Type))
    .required("Type is required"),
  status: yup.boolean().default(false),
  order: yup.number().default(0),
});

type SchemaType = yup.InferType<typeof schema>;

export const Categories: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const { addCategory, isLoading: isAddLoading } = useAddCategory();
  const onSubmit = async (data: SchemaType) => {
    const result = await addCategory(data);
    if (result) {
      reset();
    }
  };

  return (
    <div className="categories-container">
      <div className="form-section">
        <h2>Categories</h2>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <CustomInput
            control={control}
            field="name"
            error={errors.name?.message}
            label="Category"
          />
          <CustomSelect
            control={control}
            field="type"
            error={errors.type?.message}
            label="Type"
            options={typeOptions}
          />
          <CustomSwitch
            control={control}
            field="status"
            error={errors.status?.message}
            label="Status"
          />
          <CustomInput
            type="number"
            control={control}
            field="order"
            error={errors.order?.message}
            label="Order"
          />
          <Button type="primary" htmlType="submit" loading={isAddLoading}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="listing-section">
        <List/>
      </div>
    </div>
  );
};
