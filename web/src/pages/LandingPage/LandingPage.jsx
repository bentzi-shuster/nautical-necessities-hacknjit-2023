import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import {Box, Center, VStack, Text, Input, FormControl, FormLabel, Heading, Spacer, Flex, Button} from '@chakra-ui/react'

import './custom.css'
import {Form} from "@redwoodjs/forms";
const LandingPage = () => {
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
      <Center>
        <VStack mt={'10vh'}>
          <Heading color={'white'} size='2xl'>Nautical Necessities</Heading>
          <Spacer />
          <VStack ml={'5vw'} mr={'5vw'} p={'40px'} backgroundColor={'white'} borderRadius={'10px'} boxShadow={'10px 10px 66px 0px rgba(127,127,127,0.75);'}>
            <Form>
              <Flex flexDirection={'column'} gap={'40px'}>
                <FormControl isRequired>
                  <FormLabel>Game Code</FormLabel>
                  <Input border={"1px solid #DADADA"} placeholder={'XXXX'} maxLength={'4'} autoCapitalize={'characters'}></Input>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input border={"1px solid #DADADA"}></Input>
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
