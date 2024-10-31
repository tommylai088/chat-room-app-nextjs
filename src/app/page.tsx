'use client';
import AuthContainer from "@/components/features/auth/AuthContainer";
import ChatContainer from "@/components/features/chat/ChatContainer";
import { useAuth } from "@/libs/hooks/useAuth";
import { Center, Spinner } from "@chakra-ui/react";

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center maxW="1280px" margin="0 auto" h='100vh'>
        <Spinner color="orange.500" />
      </Center>
    );
  }

  return (
    <Center maxW="1280px" margin="0 auto" h='100vh'>
      {isLoggedIn ? <ChatContainer /> : <AuthContainer />}
    </Center>
  );
}
