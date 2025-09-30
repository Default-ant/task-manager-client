import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("React mounted");
  }, []);

  return <h1 style={{ color: "red" }}>React is working</h1>;
};

export default App;