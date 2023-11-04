import {navigate, routes} from '@redwoodjs/router'
import {useForm} from 'react-hook-form'
import {Button, Center, Flex, FormControl, FormLabel, Heading, Input, Spacer, VStack} from '@chakra-ui/react'

import './custom.css'
import {Form} from "@redwoodjs/forms";
import {useAuth} from "src/auth";
import {useEffect} from "react";
import {toast, Toaster} from "@redwoodjs/web/toast";

const LandingPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.game())
    }
  }, [isAuthenticated])

  let randomString = (length) => {
    if(typeof length === undefined) length = 32;
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((value) => characterSet[value % characterSet.length])
      .join('');
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)

    const response = await signUp({
      username: data.username,
      gamecode: data.gamecode,
      password: randomString(10), // this is a random string and is not important
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <svg className="background--custom" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill="#CFEBF8" fillOpacity="1" d="M-100 -100L200 -100L200 50L-100 50Z"
              style={{animation: 'path0 5s linear infinite alternate'}}/>
        <path fill="#3782C6" fillOpacity="1" d="M-100 -100L200 -100L200 50L-100 50Z"
              style={{animation: 'path1 12.5s linear infinite alternate'}}/>
        <path fill="#0000FF" fillOpacity="1" d="M-100 -100L200 -100L200 20L-100 20Z"
              style={{animation: 'path2 30s linear infinite alternate'}}/>
      </svg>
      <Toaster />
      <Center>
        <VStack mt={'10vh'}>
          <Heading color={'white'} size='2xl'>Nautical Necessities</Heading>
          <Spacer />
          <VStack ml={'5vw'} mr={'5vw'} p={'40px'} backgroundColor={'white'} borderRadius={'10px'} boxShadow={'10px 10px 66px 0px rgba(127,127,127,0.75);'}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection={'column'} gap={'40px'}>
                <FormControl isRequired>
                  <FormLabel>Game Code</FormLabel>
                  <Input {...register('gamecode')} border={"1px solid #DADADA"} placeholder={'XXXX'} maxLength={'4'} autoCapitalize={'characters'}></Input>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input {...register('username')} border={"1px solid #DADADA"}></Input>
                </FormControl>
                <Button colorScheme={'blue'} type={'submit'}>Play</Button>
                <Button colorScheme={'teal'}>Host Game</Button>
              </Flex>
            </Form>
          </VStack>
        </VStack>
      </Center>
    </>
  )
}

export default LandingPage
