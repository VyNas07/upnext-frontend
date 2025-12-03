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
  Image,
  Button,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { SearchIcon, ExternalLinkIcon, ViewIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import Navigation from '@/components/Navigation'
import { useAppStore } from '@/store/useAppStore'
import { useInstitutions, usePrograms } from '@/hooks/useApi'

export default function InstitutionsPage() {
  const { institutions, isLoading: institutionsLoading } = useInstitutions()
  const { programs, isLoading: programsLoading } = usePrograms()
  const [searchTerm, setSearchTerm] = useState('')

  const isLoading = institutionsLoading || programsLoading

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getInstitutionPrograms = (institutionId: string) => {
    return programs.filter(program => program.institutionId === institutionId)
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
              <Text>Carregando instituições...</Text>
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
            <Heading size="lg">Instituições Parceiras</Heading>
            <Text fontSize="lg" color="gray.600">
              Conheça as instituições que oferecem programas de formação em tecnologia
            </Text>
          </VStack>

          {/* Search */}
          <Box bg={bgColor} p={6} borderRadius="lg" border="1px" borderColor={borderColor} shadow="sm">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar por nome ou descrição da instituição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Box>

          {/* Results */}
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                {filteredInstitutions.length} instituição{filteredInstitutions.length !== 1 ? 'ões' : ''} encontrada{filteredInstitutions.length !== 1 ? 's' : ''}
              </Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredInstitutions.map((institution) => {
                const institutionPrograms = getInstitutionPrograms(institution.id)
                return (
                  <Card key={institution.id} shadow="md" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
                    <CardHeader pb={2}>
                      <HStack spacing={4}>
                        {institution.logoUrl && (
                          <Image
                            src={institution.logoUrl}
                            alt={institution.name}
                            boxSize="60px"
                            borderRadius="md"
                            objectFit="cover"
                          />
                        )}
                        <VStack align="start" spacing={1} flex={1}>
                          <Heading size="md" noOfLines={2}>
                            {institution.name}
                          </Heading>
                          <Badge colorScheme="brand" variant="subtle">
                            {institutionPrograms.length} programa{institutionPrograms.length !== 1 ? 's' : ''}
                          </Badge>
                        </VStack>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Text fontSize="sm" color="gray.600" noOfLines={3}>
                          {institution.description}
                        </Text>

                        <VStack align="start" spacing={2} width="100%">
                          <Text fontSize="sm" fontWeight="medium" color="gray.700">
                            Programas disponíveis:
                          </Text>
                          <VStack align="start" spacing={1} width="100%">
                            {institutionPrograms.slice(0, 3).map((program) => (
                              <HStack key={program.id} spacing={2}>
                                <Badge colorScheme="green" variant="outline" fontSize="xs">
                                  {program.level}
                                </Badge>
                                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                                  {program.title}
                                </Text>
                              </HStack>
                            ))}
                            {institutionPrograms.length > 3 && (
                              <Text fontSize="xs" color="gray.500">
                                +{institutionPrograms.length - 3} mais programa{institutionPrograms.length - 3 !== 1 ? 's' : ''}
                              </Text>
                            )}
                          </VStack>
                        </VStack>

                        <HStack spacing={2} width="100%">
                          <Button
                            size="sm"
                            variant="outline"
                            rightIcon={<ExternalLinkIcon />}
                            as="a"
                            href={institution.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            flex={1}
                          >
                            Site Oficial
                          </Button>
                          <NextLink href={`/programas?institution=${institution.name}`} passHref>
                            <Button size="sm" colorScheme="brand" leftIcon={<ViewIcon />} flex={1}>
                              Ver Programas
                            </Button>
                          </NextLink>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                )
              })}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
