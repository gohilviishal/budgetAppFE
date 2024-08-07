import React, { useState } from "react";
import { Layout, Form, Input, Button, Steps } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Register.module.scss";
import { useGenerateOtp, useRegister, useVerifyOtp } from "../../hooks";
import { IRegister } from './../../types/register.d';
import { MainLayout } from "../../layouts";

const { Step } = Steps;

const schema = yup.object().shape({
  name: yup.string().required("Please input your name!"),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please input your email!"),
  password: yup
    .string()
    .required("Please input your password!")
    .min(6, "Password must be at least 6 characters long!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match!")
    .required("Please confirm your password!"),
});

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6, "OTP must be exactly 6 characters long!")
    .required("Please input the OTP!"),
});

type SchemaType = yup.InferType<typeof schema>;
type OtpSchemaType = yup.InferType<typeof otpSchema>;

export const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [registrationData, setRegistrationData] = useState<IRegister | null>(
    null
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    reset: resetOtp,
  } = useForm({
    resolver: yupResolver(otpSchema),
  });
  const { generateOtp, isOtpGenerateLoading } = useGenerateOtp();
  const { verifyOtp, isOtpVerifyLoading } = useVerifyOtp();
  const { register, isRegisterLoading } = useRegister();

  const resetForm = () => {
    reset();
    resetOtp();
    setCurrentStep(0);
  };
  
  const onSubmit = async (data: SchemaType) => {
    const result = await generateOtp(data.email);
    if (result) {
      setCurrentStep(currentStep + 1);
      setEmail(data.email);
      setRegistrationData(data);
    }
  };

  const handle2FA = async (data: OtpSchemaType) => {
    const result = await verifyOtp({ ...data, email });
    if (result && registrationData) {
      const resultRegister = await register(registrationData);
      if (resultRegister) {
        console.log(resultRegister);
      } else {
        resetForm();
      }
    } else {
      resetForm();
    }
  };

  return (
    <MainLayout>
      <div className={styles.register}>
        <Layout className={styles.registerLayout}>
          <Steps current={currentStep}>
            <Step title="Register" />
            <Step title="2FA Setup" />
          </Steps>
          {currentStep === 0 && (
            <Form
              className={styles.registerForm}
              onFinish={handleSubmit(onSubmit)}
            >
              <Form.Item
                validateStatus={errors.name ? "error" : ""}
                help={errors.name?.message}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={styles.registerInput}
                      placeholder="Username"
                    />
                  )}
                />
              </Form.Item>
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
                      className={styles.registerInput}
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
                      className={styles.registerInput}
                      placeholder="Password"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                validateStatus={errors.confirmPassword ? "error" : ""}
                help={errors.confirmPassword?.message}
              >
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      className={styles.registerInput}
                      placeholder="Confirm Password"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.registerButton}
                  loading={isOtpGenerateLoading}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          )}
          {currentStep === 1 && (
            <Form
              className={styles.registerForm}
              onFinish={handleOtpSubmit(handle2FA)}
            >
              <Form.Item
                validateStatus={otpErrors.otp ? "error" : ""}
                help={otpErrors.otp?.message}
              >
                <Controller
                  name="otp"
                  control={otpControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={styles.registerInput}
                      placeholder="Enter OTP"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.registerButton}
                  loading={isOtpVerifyLoading || isRegisterLoading}
                >
                  {isRegisterLoading ? "Register" : "Complete 2FA Setup"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Layout>
      </div>
    </MainLayout>
  );
};
