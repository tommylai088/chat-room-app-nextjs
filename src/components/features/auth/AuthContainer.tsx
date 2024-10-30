import AuthTabs from "@/components/features/auth/AuthTabs"
import { Box, Text } from "@chakra-ui/react"

function AuthContainer() {
    return (
        <Box
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            background="white"
            p="3"
        >
            <Text fontSize="24px" mb="20px">
                Chat Room Demo
            </Text>
            <AuthTabs />
        </Box>
    )
}

export default AuthContainer