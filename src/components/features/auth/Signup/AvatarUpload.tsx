"use client"
import { getBase64 } from "@/libs/utils/app.util";
import { Avatar, Box, Flex, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChangeEvent, DragEvent, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IAvatarUploadProps {
    name: string;
}

function AvatarUpload({ name }: IAvatarUploadProps) {
    const { watch, control, resetField } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const file = watch(name)

    const onFileChange = (e: ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        const getFileBase64Async = async (file: File) => {
            const base64String = await getBase64(file)
            onChange(base64String);
        }
        const files = e.target.files;
        if (files && files[0]) {
            getFileBase64Async(files[0]);
        }
    }

    const onDragFileChange = (e: DragEvent<HTMLDivElement>, onChange: (value: string) => void) => {
        e.preventDefault();
        e.stopPropagation();
        const getFileBase64Async = async (file: File) => {
            const base64String = await getBase64(file)
            onChange(base64String)
        }
        const files = e?.dataTransfer?.files;
        if (files && files[0]) {
            getFileBase64Async(files[0]);
        }
    }

    // Handles when image is dragged over the div
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // Handles when the drag leaves the div
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <Flex justifyContent="center">
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange } }) => (
                    <Box
                        width="96px"
                        height="96px"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => onDragFileChange(e, onChange)}
                        cursor="pointer"
                    >
                        <Menu>
                            <MenuButton as={Avatar}
                                size="xl"
                                src={file}
                                // bg="orange.500"
                            >
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => inputRef?.current?.click()}
                                >
                                    Update avatar
                                </MenuItem>
                                <MenuItem
                                    onClick={() => resetField(name, { defaultValue: '' })}
                                >
                                    Reset avatar
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <Input
                            hidden
                            ref={inputRef}
                            id="file"
                            type="file"
                            onChange={(e) => onFileChange(e, onChange)}
                            onClick={(e) => e.currentTarget.value = ''}
                        />
                    </Box>
                )}
            />
        </Flex>
    );
};

export default AvatarUpload;