'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Image,
  Button,
  Alert,
  AlertIcon,
  useColorModeValue,
  IconButton,
  Tooltip,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { StarIcon, ViewIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import Navigation from '@/components/Navigation'
import { useAppStore } from '@/store/useAppStore'
import { usePrograms, useFavorites } from '@/hooks/useApi'

export default function FavoritesPage() {
  const { programs, isLoading: programsLoading } = usePrograms()
  const { favorites, isLoading: favoritesLoading, removeFavorite } = useFavorites('1')

  const isLoading = programsLoading || favoritesLoading

  const favoritePrograms = programs.filter(program => favorites.includes(program.id))

  const toggleFavorite = async (programId: string) => {
    await removeFavorite(programId)
  }

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  if (isLoading) {
    return (
      <Box>
        <Navigation />
        <Container maxW="6xl" py={8}>
          <Flex justify="center" align="center" minH="400px">
            <VStack spacing={4}>
              <Spinner size="xl" color="brand.500" />
              <Text>Carregando favoritos...</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    )
  }

  return (
    <Box>
      <Navigation />

      <Container maxW="6xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <HStack spacing={3}>
              <StarIcon color="yellow.500" boxSize={8} />
              <Heading size="lg">Meus Favoritos</Heading>
            </HStack>
            <Text fontSize="lg" color="gray.600">
              Programas que você salvou para acompanhar
            </Text>
          </VStack>

          {/* Favorites List */}
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                {favoritePrograms.length} programa{favoritePrograms.length !== 1 ? 's' : ''} favoritado{favoritePrograms.length !== 1 ? 's' : ''}
              </Text>
            </HStack>

            {favoritePrograms.length === 0 ? (
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <VStack align="start" spacing={2}>
                  <Text fontWeight="semibold">Nenhum programa favoritado ainda</Text>
                  <Text>
                    Explore os programas disponíveis e adicione os que mais te interessam aos favoritos.
                  </Text>
                  <NextLink href="/programas" passHref>
                    <Button size="sm" colorScheme="brand">
                      Explorar Programas
                    </Button>
                  </NextLink>
                </VStack>
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {favoritePrograms.map((program) => (
                  <Card key={program.id} shadow="md" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
                    <CardHeader pb={2}>
                      <Image
                        src={program.imageUrl}
                        alt={program.title}
                        borderRadius="md"
                        height="200px"
                        objectFit="cover"
                        width="100%"
                      />
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" width="100%">
                          <Badge colorScheme="brand" variant="subtle">
                            {program.category}
                          </Badge>
                          <HStack>
                            <Tooltip label="Remover dos favoritos">
                              <IconButton
                                aria-label="Remover dos favoritos"
                                icon={<StarIcon />}
                                size="sm"
                                variant="ghost"
                                color="yellow.400"
                                onClick={() => toggleFavorite(program.id)}
                              />
                            </Tooltip>
                            <Badge colorScheme="green" variant="outline">
                              {program.level}
                            </Badge>
                          </HStack>
                        </HStack>

                        <Heading size="md" noOfLines={2}>
                          {program.title}
                        </Heading>

                        <Text fontSize="sm" color="gray.600" noOfLines={3}>
                          {program.description}
                        </Text>

                        <VStack align="start" spacing={1} width="100%">
                          <HStack justify="space-between" width="100%" fontSize="sm" color="gray.500">
                            <Text fontWeight="medium">{program.institution}</Text>
                            <Text>{program.duration}</Text>
                          </HStack>
                          <HStack justify="space-between" width="100%" fontSize="sm" color="gray.500">
                            <Text>{program.format}</Text>
                            <Text>Inscrições até {new Date(program.applicationDeadline).toLocaleDateString('pt-BR')}</Text>
                          </HStack>
                        </VStack>

                        <HStack spacing={2} width="100%">
                          <NextLink href={`/programas/${program.id}`} passHref>
                            <Button size="sm" colorScheme="brand" flex={1} leftIcon={<ViewIcon />}>
                              Ver Detalhes
                            </Button>
                          </NextLink>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </VStack>

          {/* Quick Actions */}
          {favoritePrograms.length > 0 && (
            <Box bg={bgColor} p={6} borderRadius="lg" border="1px" borderColor={borderColor} shadow="sm">
              <VStack spacing={4}>
                <Heading size="md">Próximos Passos</Heading>
                <Text textAlign="center" color="gray.600">
                  Não perca as datas de inscrição dos seus programas favoritos
                </Text>
                <HStack spacing={4}>
                  <NextLink href="/programas" passHref>
                    <Button colorScheme="brand" variant="outline">
                      Ver Todos os Programas
                    </Button>
                  </NextLink>
                  <NextLink href="/perfil" passHref>
                    <Button colorScheme="brand">
                      Atualizar Perfil
                    </Button>
                  </NextLink>
                </HStack>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
