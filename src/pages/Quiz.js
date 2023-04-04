import {
 Flex ,
 Container,
 Text,
 Heading,
 VStack, 
 Button,
 Radio,
 RadioGroup,
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalBody,
 ModalFooter,
 ModalCloseButton,
 Spinner
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { ContextConsumer } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Quiz = () => {
   const navigate = useNavigate();
   const { quizData,setUserAnswers,userAnswers,setScore,score } = ContextConsumer();
   const [open,setOpen] = useState(false);
   const [loading,setLoading] = useState(false);
  
   useEffect(() => {

     if(quizData.length == 0) {
        navigate("/");
     }

   },[quizData]);

   const saveAnswer = (value,index) => {
        //check duplicate answer
        const findAnswer = userAnswers.find(answer=>answer.index==index);

        if(findAnswer) {
           findAnswer.answer = value;
           const mapped = userAnswers.map((answer) => answer.index == index ? findAnswer : answer);

           setUserAnswers(mapped);
        } else {
           setUserAnswers((prevAnswer) => [...prevAnswer, { index:index,answer:value }]);
        }
   };

   const submitQuiz = () => {
      setLoading(true);

       let countable = 0;

       for(let i = 0; i < quizData.length; i++) {
           if(quizData[i].correct_answer.trim() === userAnswers[i].answer.trim()) {
             countable+=1;
           }
       }
  
      setScore({
         result:countable 
      });

      localStorage.setItem('score', JSON.stringify(countable));

      setLoading(false);

      navigate("/result") ;
   }

   return (
    <Flex minHeight="100vh" justifyContent="center" alignItems="center" width="100%" bg="blackAlpha.100">
        <Container maxW="2xl" rounded="md" paddingX="5" paddingY="8" bg="white" shadow="md">
           <Flex width='100%' alignItems="center" justifyContent="space-between">
            <Heading size="md">Your Quiz</Heading>
            <Text fontSize="sm" fontWeight="semibold" color="blackAlpha.500">Answer : {userAnswers.length} / {quizData.length}</Text>
           </Flex>
           <Flex flexDirection="column" rowGap="5" marginTop="7">
              {quizData && Array.isArray(quizData) && quizData?.map((quiz,idx) => (
                  <Flex  flexDirection="column" key={idx}>
                     <Text fontWeight="semibold" textAlign="left" fontSize="md">
                       {idx+1}. {quiz.question}
                     </Text>
                     <RadioGroup onChange={(value)=>saveAnswer(value,idx)} marginTop="3" rowGap="3">
                        <Flex rowGap="3" flexDirection="column">
                        {quiz?.incorrect_answers?.map((answer,idx) => (
                            <Radio name="answer" value={answer} key={idx}>{answer}</Radio>
                            ))}
                        </Flex>
                     </RadioGroup>
                  </Flex>
              ))}
           </Flex>

           <Flex justifyContent="center" alignItems="center" columnGap="3" marginTop="7">
           <Button  onClick={()=>setOpen(true)}  colorScheme="teal">Submit Quiz</Button>
           <Button variant="outline" colorScheme="teal">End Quiz</Button>
           </Flex>
        </Container>
        <Modal isOpen={open} onClose={()=>setOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          {loading ? null : <ModalHeader>Quiz Confirm</ModalHeader>}
          <ModalCloseButton onClick={()=>setOpen(false)} />
          {loading ? (
            <ModalBody paddingY="10" textAlign="center"> 
               <Spinner color="teal" size="xl" />
               <Heading marginTop="5" size="md">Counting your results...</Heading>
            </ModalBody>
          ) : (
               <ModalBody textAlign="center">
               <InfoOutlineIcon color="blue.400" fontSize="5xl"  />
               <Text fontSize="md" marginTop="5" color="blackAlpha.600">Are you sure want to submit your quiz answers?</Text>
               <Text fontSize="md"  color="blackAlpha.600">Your answers : {userAnswers.length} / {quizData.length}</Text>
               
            </ModalBody>
          )}
          {loading ? null : (
            <ModalFooter marginTop="5">
            <Button onClick={submitQuiz} marginRight="4" colorScheme="teal" variant="solid">Confirm Submit</Button>
           <Button onClick={()=>setOpen(false)}>Close</Button>
         </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Flex>
   )
}

export default Quiz;