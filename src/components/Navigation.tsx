'use client'

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Badge,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { useAppStore } from '@/store/useAppStore'

const Links = [
  { name: 'Programas', href: '/programas' },
  { name: 'Instituições', href: '/instituicoes' },
  { name: 'Favoritos', href: '/favoritos' },
  { name: 'Perfil', href: '/perfil' },
]

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pathname = usePathname()
  const favorites = useAppStore((state) => state.favorites)
  const hoverBg = useColorModeValue('gray.200', 'gray.700')

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <NextLink href="/" passHref>
              <Text fontSize="xl" fontWeight="bold" color="brand.500">
                UpNext
              </Text>
            </NextLink>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NextLink key={link.name} href={link.href} passHref>
                  <Link
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: hoverBg,
                    }}
                    bg={pathname === link.href ? 'brand.100' : 'transparent'}
                    color={pathname === link.href ? 'brand.600' : 'inherit'}
                    fontWeight={pathname === link.href ? 'semibold' : 'normal'}
                  >
                    {link.name}
                    {link.name === 'Favoritos' && favorites.length > 0 && (
                      <Badge ml={2} colorScheme="brand" variant="solid">
                        {favorites.length}
                      </Badge>
                    )}
                  </Link>
                </NextLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NextLink key={link.name} href={link.href} passHref>
                  <Link
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: hoverBg,
                    }}
                    bg={pathname === link.href ? 'brand.100' : 'transparent'}
                    color={pathname === link.href ? 'brand.600' : 'inherit'}
                    fontWeight={pathname === link.href ? 'semibold' : 'normal'}
                  >
                    {link.name}
                    {link.name === 'Favoritos' && favorites.length > 0 && (
                      <Badge ml={2} colorScheme="brand" variant="solid">
                        {favorites.length}
                      </Badge>
                    )}
                  </Link>
                </NextLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
