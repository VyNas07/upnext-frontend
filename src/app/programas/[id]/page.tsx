'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Image,
  Button,
  Card,
  CardBody,
  List,
  ListItem,
  ListIcon,
  Divider,
  Alert,
  AlertIcon,
  useColorModeValue,
  IconButton,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import {
  StarIcon,
  ChevronRightIcon,
  CheckIcon,
  CalendarIcon,
  TimeIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons'
import { useParams, notFound } from 'next/navigation'
import NextLink from 'next/link'
import Navigation from '@/components/Navigation'
import { useAppStore } from '@/store/useAppStore'
import { useEffect, useState } from 'react'
import { usePrograms, useInstitutions, useFavorites } from '@/hooks/useApi'

export default function ProgramDetailPage() {
  const params = useParams()
  const programId = params.id as string
  const { programs, isLoading: programsLoading } = usePrograms()
  const { institutions, isLoading: institutionsLoading } = useInstitutions()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites('1')

  const isLoading = programsLoading || institutionsLoading

  const program = programs.find(p => p.id === programId)
  const institution = program ? institutions.find(i => i.id === program.institutionId) : null

  const toggleFavorite = async () => {
    if (program) {
      if (isFavorite(program.id)) {
        await removeFavorite(program.id)
      } else {
        await addFavorite(program.id)
      }
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
              <Text>Carregando programa...</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    )
  }

  if (!program) {
    notFound()
  }

  const isApplicationOpen = new Date(program.applicationDeadline) > new Date()

  return (
    <Box>
      <Navigation />

      <Container maxW="6xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Breadcrumb */}
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/programas">
                Programas
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{program.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Program Header */}
          <Card bg={bgColor} border="1px" borderColor={borderColor}>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={4} flex={1}>
                    <HStack spacing={3}>
                      <Badge colorScheme="brand" variant="solid" fontSize="sm">
                        {program.category}
                      </Badge>
                      <Badge colorScheme="green" variant="outline" fontSize="sm">
                        {program.level}
                      </Badge>
                      <Badge colorScheme="blue" variant="outline" fontSize="sm">
                        {program.format}
                      </Badge>
                    </HStack>

                    <Heading size="lg">{program.title}</Heading>

                    <Text fontSize="lg" color="gray.600">
                      {program.description}
                    </Text>

                    <HStack spacing={6} fontSize="sm" color="gray.500">
                      <HStack>
                        <CalendarIcon />
                        <Text>Duração: {program.duration}</Text>
                      </HStack>
                      <HStack>
                        <TimeIcon />
                        <Text>Início: {new Date(program.startDate).toLocaleDateString('pt-BR')}</Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <VStack spacing={4}>
                    <Tooltip label={isFavorite(program.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
                      <IconButton
                        aria-label="Favoritar"
                        icon={<StarIcon />}
                        size="lg"
                        variant="outline"
                        color={isFavorite(program.id) ? 'yellow.400' : 'gray.400'}
                        onClick={toggleFavorite}
                      />
                    </Tooltip>

                    {isApplicationOpen ? (
                      <Button colorScheme="brand" size="lg" rightIcon={<ExternalLinkIcon />}>
                        Inscrever-se
                      </Button>
                    ) : (
                      <Alert status="warning" borderRadius="md">
                        <AlertIcon />
                        Inscrições encerradas
                      </Alert>
                    )}
                  </VStack>
                </HStack>

                {program.imageUrl && (
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    borderRadius="lg"
                    height="300px"
                    objectFit="cover"
                    width="100%"
                  />
                )}
              </VStack>
            </CardBody>
          </Card>

          <HStack spacing={8} align="start">
            {/* Main Content */}
            <VStack spacing={6} align="stretch" flex={2}>
              {/* Requirements */}
              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Requisitos</Heading>
                    <List spacing={2}>
                      {program.requirements.map((requirement, index) => (
                        <ListItem key={index}>
                          <ListIcon as={CheckIcon} color="green.500" />
                          {requirement}
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                </CardBody>
              </Card>

              {/* Benefits */}
              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Benefícios</Heading>
                    <List spacing={2}>
                      {program.benefits.map((benefit, index) => (
                        <ListItem key={index}>
                          <ListIcon as={CheckIcon} color="green.500" />
                          {benefit}
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>

            {/* Sidebar */}
            <VStack spacing={6} align="stretch" flex={1}>
              {/* Institution Info */}
              {institution && (
                <Card bg={bgColor} border="1px" borderColor={borderColor}>
                  <CardBody>
                    <VStack align="start" spacing={4}>
                      <Heading size="md">Instituição</Heading>
                      <HStack spacing={3}>
                        {institution.logoUrl && (
                          <Image
                            src={institution.logoUrl}
                            alt={institution.name}
                            boxSize="50px"
                            borderRadius="md"
                            objectFit="cover"
                          />
                        )}
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">{institution.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {institution.programsCount} programa{institution.programsCount !== 1 ? 's' : ''}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        {institution.description}
                      </Text>
                      <Button
                        size="sm"
                        variant="outline"
                        rightIcon={<ExternalLinkIcon />}
                        as="a"
                        href={institution.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visitar Site
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              )}

              {/* Program Details */}
              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Detalhes do Programa</Heading>
                    <VStack align="start" spacing={3} width="100%">
                      <HStack justify="space-between" width="100%">
                        <Text fontSize="sm" color="gray.600">Formato:</Text>
                        <Badge colorScheme="blue" variant="outline">
                          {program.format}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between" width="100%">
                        <Text fontSize="sm" color="gray.600">Nível:</Text>
                        <Badge colorScheme="green" variant="outline">
                          {program.level}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between" width="100%">
                        <Text fontSize="sm" color="gray.600">Duração:</Text>
                        <Text fontSize="sm" fontWeight="medium">{program.duration}</Text>
                      </HStack>
                      <Divider />
                      <VStack align="start" spacing={2} width="100%">
                        <Text fontSize="sm" color="gray.600">Período de Inscrição:</Text>
                        <Text fontSize="sm">
                          Até {new Date(program.applicationDeadline).toLocaleDateString('pt-BR')}
                        </Text>
                        <Text fontSize="sm" color="gray.600">Início do Programa:</Text>
                        <Text fontSize="sm">
                          {new Date(program.startDate).toLocaleDateString('pt-BR')}
                        </Text>
                        <Text fontSize="sm" color="gray.600">Término:</Text>
                        <Text fontSize="sm">
                          {new Date(program.endDate).toLocaleDateString('pt-BR')}
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
