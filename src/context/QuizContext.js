import { createContext,useContext,useState } from "react";

const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
    const [quizSetup,setQuizSetup] = useState({
        category:"sports",
        difficult:"easy",
        amount:0 
    });
    const [quizData,setQuizData] = useState(JSON.parse(localStorage.getItem('quiz')) || []);
    const [userAnswers,setUserAnswers] = useState([]);
    const [score,setScore] = useState({
        result:JSON.parse(localStorage.getItem('score')) || 0,
        percentResult:0
    });

    return (
       <QuizContext.Provider value={{
          quizSetup,
          setQuizSetup,
          quizData,
          setQuizData,
          setUserAnswers,
          userAnswers,
          setScore,
          score
       }}>
        {children}
       </QuizContext.Provider>   
    )
}

export const ContextConsumer = () => useContext(QuizContext);

export default QuizContextProvider;