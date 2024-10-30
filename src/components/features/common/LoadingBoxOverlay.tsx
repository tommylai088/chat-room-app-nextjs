import { Box, Center, Flex, Spinner } from "@chakra-ui/react";

interface ILoadingBoxOverlayProps {
    loading: boolean;
}

function LoadingBoxOverlay({ loading }: ILoadingBoxOverlayProps) {
    return (
        <>
            {loading &&
                <Box pos="absolute" inset="0">
                    <Center h="full">
                        <Flex
                            bg="white"
                            h="80px"
                            w="80px"
                            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Spinner size="lg" color="orange.500" />
                        </Flex>
                    </Center>
                </Box>
            }
        </>)
}

export default LoadingBoxOverlay;