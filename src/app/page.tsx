'use client';
import AuthContainer from "@/components/features/auth/AuthContainer";
import ChatContainer from "@/components/features/chat/ChatContainer";
import { useAuth } from "@/libs/hooks/useAuth";
import { Box, Center, Spinner } from "@chakra-ui/react";

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center maxW="1280px" margin="0 auto" h='100dvh'>
        <Spinner color="orange.500" size="lg" />
      </Center>
    );
  }

  return (
    <Box maxW={{
      base: '600px',
      md: '1280px'
    }}
      margin="0 auto"
      h='100dvh'
      display={{
        base: 'unset',
        md: 'flex'
      }}
      justifyContent="center"
      alignItems="center"
    >
      {isLoggedIn ? <ChatContainer /> : <AuthContainer />}
    </Box>
  );
}
