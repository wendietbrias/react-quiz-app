import { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Container,
    Flex,
    Heading ,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Alert,
    AlertIcon,
    AlertTitle
} from "@chakra-ui/react";
import { ContextConsumer } from "../context/QuizContext";
import axios from "axios";

const SetupQuiz = () => {
   const { quizSetup, setQuizSetup,setQuizData } = ContextConsumer();
   const [loading,setLoading] = useState(false);

   const navigate = useNavigate();

   const changeHandler = (e) => {
        setQuizSetup({...quizSetup,[e.target.name]:e.target.value});
   }

   const submitHandler = async (e) => {
      e.preventDefault();

      
      try{
          setLoading(true);
          
          const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}?amount=${quizSetup.amount}&category=${quizSetup.category}&difficulty=${quizSetup.difficult}&type=multiple`);
          if(data) {
            const mapped = data.results.map((quiz)=> {
                 return {...quiz, incorrect_answers:[...quiz.incorrect_answers,quiz.correct_answer].sort(()=>Math.random() > 0.5 ? 1 : -1)};
            });

            setQuizData(mapped);
            localStorage.setItem('quiz', JSON.stringify(mapped));
            navigate("/quiz");
          }

          setLoading(false);
      }catch(err) {
         return err;
      }

   }

    return (
       <Flex bg="blackAlpha.100" height="100vh" flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        <Container bg="white" paddingY="18" rounded="md" maxW="md" shadow="md">
            {
            loading 
             &&
            <Alert status="info">
              <AlertIcon/>
              We try to setup your quiz
            </Alert>
            }
            <Heading size="md" textAlign="center">SetupQuiz</Heading>
            <form onSubmit={submitHandler} style={{
                marginTop:'15px'
            }}>
            <FormControl marginTop="5">
             <FormLabel size="sm">Category</FormLabel>     
             <Select onChange={changeHandler} name="category" value={quizSetup.category}>
                <option value="21">Sports</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="20">Mythology</option>
             </Select>
            </FormControl>
            <FormControl marginTop="3">
             <FormLabel size="sm">Difficult</FormLabel>     
             <Select onChange={changeHandler} name="difficult" value={quizSetup.difficult}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
             </Select>
            </FormControl>
            <FormControl marginTop="3">
             <FormLabel size="sm">Amount</FormLabel>     
             <Input onChange={changeHandler} value={quizSetup.amount} name="amount" type="number"/>
            </FormControl>
            <Button type="submit" marginTop="7" variant="solid" colorScheme="teal" width="100%">Start Quiz</Button>
            </form>
        </Container>
       </Flex>
    )
}

export default SetupQuiz;