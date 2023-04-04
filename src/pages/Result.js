import {
    Button,
    Container,
    Flex,
    Heading, 
    Text
} from '@chakra-ui/react';
import { CheckCircleIcon } from "@chakra-ui/icons";
import { ContextConsumer } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate();
    const { score ,setUserAnswers, setScore,quizData,setQuizData,setQuizSetup } = ContextConsumer();

    const backHandler = () => {
        setQuizData([]);
        setScore({
            result:0
        });
        setUserAnswers([]);
        setQuizSetup({
            amount:0,
            difficult:'easy',
            category:'20'
        });

        localStorage.setItem('quiz' , JSON.stringify([]));

        navigate("/");
    }

    return (
        <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="blackAlpha.100">
            <Container display="flex" flexDirection="column" alignItems="center" maxW="xl" bg="white" padding="5" shadow="md" rounded="md">
                <CheckCircleIcon color="teal.300" fontSize="5xl" />
                <Heading marginTop="5" marginBottom="2" size="md">Your Results is : </Heading>
                <Text fontSize="3xl">
                    {(score.result/quizData.length) * 100}%
                </Text>

                <Button onClick={backHandler} variant="solid" colorScheme="blackAlpha" marginTop="7" width="100%">Back to setup</Button>
            </Container>
        </Flex>
    )
}

export default Result;