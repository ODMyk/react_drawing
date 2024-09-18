import {useCallback, useState} from "react";
import "./App.css";
import {Gallery} from "./components/Gallery";
import {Paint} from "./components/Paint";

function App() {
  const [updater, setUpdater] = useState(false);
  const refresh = useCallback(() => setUpdater((prev) => !prev), [setUpdater]);
  return (
    <>
      <Paint refresh={refresh} />
      <Gallery updater={updater} refresh={refresh} />
    </>
  );
}

export default App;
