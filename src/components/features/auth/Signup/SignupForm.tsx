'use client';
import { Alert, AlertIcon, Button, FormControl, FormErrorMessage, Input, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { createUser } from "@/app/services/auth.service";
import { ICreateUser } from "@/libs/interfaces";
import request from "axios";
import AvatarUpload from "@/components/features/auth/Signup/AvatarUpload";
import LoadingBoxOverlay from "@/components/features/common/LoadingBoxOverlay";
import { useState } from "react";

function SignupForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { trigger: create } = useSWRMutation('/auth/register', createUser);
    const methods = useForm<ICreateUser>();
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
        reset,
        setError,
        clearErrors
    } = methods

    const onSubmit = (values: ICreateUser) => {
        setIsLoading(true)
        const createUserAsync = async () => {
            try {
                const newUser: ICreateUser = {
                    username: values?.username,
                    password: values?.password,
                    avatar: values?.avatar
                };
                const response = await create({
                    requestBody: newUser
                })
                if (response) {
                    reset();
                    setIsSuccess(true)
                    setTimeout(() => {
                        setIsSuccess(false)
                    }, 5000)
                }
            } catch (err) {
                if (request.isAxiosError(err) && err.response) {
                    setError("root.signupError", {
                        type: `${err.response.status}`
                    })
                }
            } finally {
                setIsLoading(false)
            }
        }
        clearErrors();
        createUserAsync();
    }

    return (
        <FormProvider {...methods}>
            {isSuccess && (
                <Alert mb="3" status="success">
                    <AlertIcon />
                    Sign up successful
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <AvatarUpload name="avatar" />
                <FormControl mt={4} isInvalid={Boolean(errors?.username)}>
                    <Input
                        {...register('username', {
                            required: 'Username is required',
                        })}
                        placeholder="Username"
                        autoComplete="username"
                    />
                    <FormErrorMessage>{errors?.username?.message?.toString()}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={Boolean(errors?.password)}>
                    <Input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        placeholder='Password'
                        type='password'
                        autoComplete="new-password"
                    />
                    <FormErrorMessage>{errors?.password?.message?.toString()}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={Boolean(errors?.confirmPassword)}>
                    <Input
                        {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: (val?: string) => {
                                if (watch('password') != val) {
                                    return "Please make sure your passwords match";
                                }
                            },
                        })}
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                    />
                    <FormErrorMessage>{errors?.confirmPassword?.message?.toString()}</FormErrorMessage>
                </FormControl>
                {errors?.root?.signupError?.type == 400 && <Text color="red.400" mt="4">Sign up failed</Text>}
                <Button
                    mt={4}
                    w="100%"
                    type='submit'
                >
                    Sign up
                </Button>
            </form>
            <LoadingBoxOverlay loading={isLoading} />
        </FormProvider>
    )
}

export default SignupForm;