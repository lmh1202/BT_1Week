import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "../about/About";
import ExerciseB1 from "../exercise-b1/ExerciseB1";
import ExerciseB2 from "../exercise-b2/ExerciseB2";
import Exercise1 from "../exercise1/Exercise1";
import Exercise2 from "../exercise2/Exercise2";
import Exercise3 from "../exercise3/Exercise3";
import Exercise4 from "../exercise4/Exercise4";
import Exercise5 from "../exercise5/Exercise5";
import ExerciseC1 from "../exercise-c1/ExerciseC1";
import ExerciseC2 from "../exercise-c2/ExerciseC2";
function Main() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/exercise/1" element={<Exercise1 />} />
        <Route path="/exercise/2" element={<Exercise2 />} />
        <Route path="/exercise/3" element={<Exercise3 />} />
        <Route path="/exercise/4" element={<Exercise4 />} />
        <Route path="/exercise/5" element={<Exercise5 />} />
        <Route path="/exercise/b1" element={<ExerciseB1 />} />
        <Route path="/exercise/b2" element={<ExerciseB2 />} />
        <Route path="/exercise/c1" element={<ExerciseC1 />} />
        <Route path="/exercise/c2" element={<ExerciseC2 />} />
        <Route path="*" element={<Navigate to="/about" />} />
      </Routes>
    </>
  );
}

export default Main;
