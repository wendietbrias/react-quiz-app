import React from "react";
import { Routes,Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { SetupQuiz,Quiz,Result } from "./pages";

function App() {
  return (
    <ChakraProvider>
     <Routes>
      <Route index element={<SetupQuiz/>}/>
      <Route path="/quiz" element={<Quiz/>}/>
      <Route path="/result" element={<Result/>}/>
     </Routes>
    </ChakraProvider>
  );
}

export default App;
