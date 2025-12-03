'use client'

import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Image,
  Text,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { useState, useEffect, useMemo } from 'react'
import NextLink from 'next/link'
import Navigation from '@/components/Navigation'
import { useAppStore } from '@/store/useAppStore'
import { usePrograms, useFavorites } from '@/hooks/useApi'
import { categories, levels, formats } from '@/data/mockData'

export default function ProgramsPage() {
  const { programs, filters, setFilters, isLoading: storeLoading } = useAppStore()
  const { programs: apiPrograms } = usePrograms()
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites('1') // Using default user ID
  const [searchTerm, setSearchTerm] = useState('')

  const isLoading = storeLoading || (programs.length === 0 && apiPrograms.length === 0)

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.institution.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !filters.category || program.category === filters.category
      const matchesLevel = !filters.level || program.level === filters.level
      const matchesFormat = !filters.format || program.format === filters.format

      return matchesSearch && matchesCategory && matchesLevel && matchesFormat
    })
  }, [programs, searchTerm, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value })
  }

  const toggleFavorite = async (programId: string) => {
    try {
      if (isFavorite(programId)) {
        await removeFavorite(programId)
      } else {
        await addFavorite(programId)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
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
              <Text>Carregando programas...</Text>
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
            <Heading size="lg">Programas de Formação</Heading>
            <Text fontSize="lg" color="gray.600">
              Encontre o programa ideal para sua carreira em tecnologia
            </Text>
          </VStack>

          {/* Filters */}
          <Box bg={bgColor} p={6} borderRadius="lg" border="1px" borderColor={borderColor} shadow="sm">
            <VStack spacing={4}>
              {/* Search */}
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar por título, descrição ou instituição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              {/* Filter Controls */}
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} width="100%">
                <Select
                  placeholder="Todas as categorias"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>

                <Select
                  placeholder="Todos os níveis"
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                >
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </Select>

                <Select
                  placeholder="Todos os formatos"
                  value={filters.format}
                  onChange={(e) => handleFilterChange('format', e.target.value)}
                >
                  {formats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({ category: '', level: '', format: '' })
                    setSearchTerm('')
                  }}
                >
                  Limpar Filtros
                </Button>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Results */}
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                {filteredPrograms.length} programa{filteredPrograms.length !== 1 ? 's' : ''} encontrado{filteredPrograms.length !== 1 ? 's' : ''}
              </Text>
            </HStack>

            {filteredPrograms.length === 0 ? (
              <Alert status="info">
                <AlertIcon />
                Nenhum programa encontrado com os filtros aplicados. Tente ajustar sua busca.
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filteredPrograms.map((program) => (
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
                            <Tooltip label={isFavorite(program.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
                              <IconButton
                                aria-label="Favoritar"
                                icon={<StarIcon />}
                                size="sm"
                                variant="ghost"
                                color={isFavorite(program.id) ? 'yellow.400' : 'gray.400'}
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
        </VStack>
      </Container>
    </Box>
  )
}
