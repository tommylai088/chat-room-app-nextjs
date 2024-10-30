import { Badge, Text } from "@chakra-ui/react";
interface IUnreadBadgeProps {
    count: number
}

function UnreadBadge({ count }: IUnreadBadgeProps) {

    return (
        <Badge
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="15px"
            h="25px"
            minW="25px"
            p="8px"
            variant='solid'
        >
            <Text fontSize="12px">
                {count}
            </Text>
        </Badge>
    )
}

export default UnreadBadge;