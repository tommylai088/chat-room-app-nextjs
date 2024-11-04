'use client';
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface IUserSearchInputProps {
    callback: (searchValue: string) => void;
    searchValue: string;
    resetValue: () => void;
}

function UserSearchInput({ callback, searchValue, resetValue }: IUserSearchInputProps) {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        callback(event?.target?.value);
    }

    return (
        <Box w="100%" px="3" py="2" height="60px">
            <Flex alignItems="center">
                <Input
                    placeholder="Search users e.g tommy"
                    borderRadius="15px"
                    onChange={(e) => onChange(e)}
                    value={searchValue}
                    paddingRight={searchValue ? '32px' : '0px'}
                />
                {searchValue &&
                    <IconButton
                        zIndex="10"
                        onClick={() => resetValue()}
                        size="xs"
                        isRound={true}
                        fontSize="18px"
                        marginLeft="-30px"
                        colorScheme="orange"
                        aria-label="Clear search value"
                        icon={<IoCloseOutline />}
                    />
                }
            </Flex>
        </Box>
    );
}

export default UserSearchInput;
