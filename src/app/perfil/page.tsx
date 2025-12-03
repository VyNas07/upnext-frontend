'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Badge,
  Avatar,
  useColorModeValue,
  Alert,
  AlertIcon,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { useAppStore } from '@/store/useAppStore'
import { categories, levels } from '@/data/mockData'
import { api } from '@/services/api'

export default function ProfilePage() {
  const { user, setUser, updateUserInterests, favorites } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'iniciante' as 'iniciante' | 'intermediario' | 'avancado',
    interests: [] as string[],
  })

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      if (!user) {
        setIsLoading(true)
        try {
          const userData = await api.getUserById('1')
          setUser(userData)
          setFormData({
            name: userData.name,
            email: userData.email,
            level: userData.level,
            interests: userData.interests,
          })
        } catch (error) {
          console.error('Error fetching user:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setFormData({
          name: user.name,
          email: user.email,
          level: user.level,
          interests: user.interests,
        })
      }
    }
    fetchUser()
  }, [user, setUser])

  const handleInputChange = (field: string, value: string | (string | number)[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'interests' ? (value as string[]) : value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const userId = user?.id || '1'
      const updatedUser = await api.updateUser(userId, {
        name: formData.name,
        email: formData.email,
        level: formData.level,
        interests: formData.interests,
      })
      setUser(updatedUser)
      updateUserInterests(formData.interests)
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  if (isLoading) {
    return (
      <Box>
        <Navigation />
        <Container maxW="4xl" py={8}>
          <Flex justify="center" align="center" minH="400px">
            <VStack spacing={4}>
              <Spinner size="xl" color="brand.500" />
              <Text>Carregando perfil...</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    )
  }

  return (
    <Box>
      <Navigation />

      <Container maxW="4xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Avatar size="xl" name={formData.name} bg="brand.500" />
            <Heading size="lg">Meu Perfil</Heading>
            <Text fontSize="lg" color="gray.600">
              Gerencie suas informações e preferências para receber recomendações personalizadas
            </Text>
          </VStack>

          <HStack spacing={8} align="start">
            {/* Profile Form */}
            <VStack spacing={6} align="stretch" flex={2}>
              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Informações Pessoais</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Nome Completo</FormLabel>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Nível de Experiência</FormLabel>
                      <Select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                      >
                        {levels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Áreas de Interesse</Heading>
                  <Text fontSize="sm" color="gray.600">
                    Selecione as áreas que mais te interessam para receber recomendações personalizadas
                  </Text>
                </CardHeader>
                <CardBody>
                  <CheckboxGroup
                    value={formData.interests}
                    onChange={(values) => handleInputChange('interests', values)}
                  >
                    <Stack spacing={3}>
                      {categories.map((category) => (
                        <Checkbox key={category} value={category}>
                          {category}
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </CardBody>
              </Card>

              <Button
                colorScheme="brand"
                size="lg"
                onClick={handleSave}
                isLoading={isSaving}
                loadingText="Salvando..."
              >
                Salvar Alterações
              </Button>
            </VStack>

            {/* Profile Stats */}
            <VStack spacing={6} align="stretch" flex={1}>
              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Estatísticas</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Programas Favoritados:</Text>
                      <Badge colorScheme="brand" variant="solid">
                        {favorites.length}
                      </Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Nível Atual:</Text>
                      <Badge colorScheme="green" variant="outline">
                        {formData.level}
                      </Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Interesses:</Text>
                      <Badge colorScheme="blue" variant="outline">
                        {formData.interests.length}
                      </Badge>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card bg={bgColor} border="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Interesses Selecionados</Heading>
                </CardHeader>
                <CardBody>
                  {formData.interests.length === 0 ? (
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      Nenhum interesse selecionado
                    </Text>
                  ) : (
                    <VStack spacing={2} align="stretch">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} colorScheme="blue" variant="subtle" textAlign="center" py={1}>
                          {interest}
                        </Badge>
                      ))}
                    </VStack>
                  )}
                </CardBody>
              </Card>

              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">
                    Dica
                  </Text>
                  <Text fontSize="xs">
                    Mantenha seus interesses atualizados para receber as melhores recomendações de programas.
                  </Text>
                </VStack>
              </Alert>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
