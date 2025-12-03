'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Image,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import Navigation from '@/components/Navigation'
import { useAppStore } from '@/store/useAppStore'
import { useEffect } from 'react'
import { usePrograms, useInstitutions } from '@/hooks/useApi'
import { api } from '@/services/api'

export default function Home() {
  const { setUser } = useAppStore()
  const { programs, isLoading: programsLoading } = usePrograms()
  const { institutions, isLoading: institutionsLoading } = useInstitutions()
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.400, brand.600)',
    'linear(to-r, brand.500, brand.700)'
  )

  useEffect(() => {
    // Initialize user (ID 1 from seed)
    const fetchUser = async () => {
      try {
        const user = await api.getUserById('1')
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [setUser])

  const featuredPrograms = programs.slice(0, 3)
  const stats = [
    { label: 'Programas Ativos', value: programs.length },
    { label: 'Instituições Parceiras', value: institutions.length },
    { label: 'Categorias Disponíveis', value: 10 },
    { label: 'Alunos Formados', value: '2.5k+' },
  ]

  return (
    <Box>
      <Navigation />

      {/* Hero Section */}
      <Box bgGradient={bgGradient} color="white" py={20}>
        <Container maxW="6xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="2xl" mb={4}>
              Encontre o Programa de Formação Ideal para Você
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Conectamos talentos com as melhores oportunidades de formação em tecnologia.
              Descubra programas que se alinham com seus objetivos de carreira.
            </Text>
            <HStack spacing={4}>
              <NextLink href="/programas" passHref>
                <Button size="lg" colorScheme="white" variant="solid" rightIcon={<ArrowForwardIcon />}>
                  Explorar Programas
                </Button>
              </NextLink>
              <NextLink href="/instituicoes" passHref>
                <Button size="lg" variant="outline" color="white" borderColor="white" _hover={{ bg: 'whiteAlpha.200' }}>
                  Ver Instituições
                </Button>
              </NextLink>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={16} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <Stat key={index} textAlign="center">
                <StatNumber fontSize="3xl" color="brand.500">
                  {stat.value}
                </StatNumber>
                <StatLabel fontSize="lg">{stat.label}</StatLabel>
              </Stat>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Programs */}
      <Box py={16}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="lg">Programas em Destaque</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                Conheça alguns dos programas mais procurados pelos nossos usuários
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {featuredPrograms.map((program) => (
                <Card key={program.id} shadow="lg" _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }} transition="all 0.2s">
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
                          <StarIcon color="yellow.400" />
                          <Text fontSize="sm" color="gray.600">
                            {program.level}
                          </Text>
                        </HStack>
                      </HStack>

                      <Heading size="md">{program.title}</Heading>

                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {program.description}
                      </Text>

                      <HStack justify="space-between" width="100%" fontSize="sm" color="gray.500">
                        <Text>{program.institution}</Text>
                        <Text>{program.duration}</Text>
                      </HStack>

                      <NextLink href={`/programas/${program.id}`} passHref>
                        <Button size="sm" colorScheme="brand" width="100%">
                          Ver Detalhes
                        </Button>
                      </NextLink>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            <NextLink href="/programas" passHref>
              <Button size="lg" colorScheme="brand" variant="outline">
                Ver Todos os Programas
              </Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={useColorModeValue('brand.50', 'brand.900')} py={16}>
        <Container maxW="4xl" textAlign="center">
          <VStack spacing={8}>
            <Heading size="lg">Pronto para Começar sua Jornada?</Heading>
            <Text fontSize="lg" color="gray.600">
              Cadastre-se e receba notificações sobre novos programas que combinam com seu perfil
            </Text>
            <NextLink href="/perfil" passHref>
              <Button size="lg" colorScheme="brand" rightIcon={<ArrowForwardIcon />}>
                Criar Perfil
              </Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}