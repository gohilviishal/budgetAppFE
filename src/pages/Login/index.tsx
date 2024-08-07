import React from "react";
import { Form, Input, Button, Layout } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogin } from "../../hooks";
import { MainLayout } from "../../layouts";

const { Content } = Layout;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please input your email!"),
  password: yup.string().required("Please input your password!"),
});

type SchemaType = yup.InferType<typeof schema>;

export const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { login, isLoginLoading } = useLogin();
  const onSubmit = async (data: SchemaType) => {
    const result = await login(data);
    if (result) {
      setToken(result.token);
      navigate("/dashboard/tags");
    }
  };

  return (
    <MainLayout>
      <div className={styles.login}>
        <Layout className={styles.loginLayout}>
          <Content>
            <Form
              className={styles.loginForm}
              onFinish={handleSubmit(onSubmit)}
            >
              <Form.Item
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={styles.loginInput}
                      placeholder="Email"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      className={styles.loginInput}
                      placeholder="Password"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
                  loading={isLoginLoading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </div>
    </MainLayout>
  );
};
