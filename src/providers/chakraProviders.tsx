'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export function ChakraProviders({
  children
}: {
  children: React.ReactNode
}) {

  const theme = extendTheme({
    fonts: {
      heading: '"Avenir Next", sans-serif',
      body: '"Open Sans", sans-serif',
    },
    colors: {
    },
    components: {
      Button: {
        defaultProps: {
          size: 'md',
          variant: 'solid',
          colorScheme: 'orange'
        },
      },
      Tabs: {
        defaultProps: {
          colorScheme: 'orange'
        }
      },
      Badge: {
        defaultProps: {
          colorScheme: 'orange'
        }
      },
      IconButton: {
        defaultProps: {
          colorScheme: 'orange'
        }
      },
      Avatar: {
        parts: ["container"],
        baseStyle: {
          container: {
            bg: 'orange.500',
            color: 'white'
          }
        }
      },
      Input: {
        defaultProps: {
          focusBorderColor: 'orange.500',
        },
      }
    },
  })

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}