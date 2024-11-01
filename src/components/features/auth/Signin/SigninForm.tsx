'use client';
import LoadingBoxOverlay from "@/components/features/common/LoadingBoxOverlay";
import { ILogin } from "@/libs/interfaces";
import { Button, FormControl, FormErrorMessage, Input, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function SigninForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const methods = useForm<ILogin>();
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors
    } = methods


    const onSubmit = (values: ILogin) => {
        clearErrors();
        setIsLoading(true)
        signIn("credentials", {
            username: values?.username,
            password: values?.password,
            redirect: false
        }).then(response => {
            setIsLoading(false)
            if (response?.status === 200) {
                console.log(response)
                window.location.reload()
            } else {
                setError("root.signinError", {
                    type: `${response?.status}`
                })
            }
        })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <FormErrorMessage>{errors?.password?.message?.toString()}</FormErrorMessage>
                </FormControl>
                {errors?.root?.signinError?.type == 401 && <Text color="red.400" mt="4">incorrect username or password</Text>}
                <Button
                    isDisabled={isLoading}
                    mt={4}
                    w="100%"
                    type="submit"
                >
                    Sign in
                </Button>
            </form>
            <LoadingBoxOverlay loading={isLoading} />
        </FormProvider>
    )
}

export default SigninForm;