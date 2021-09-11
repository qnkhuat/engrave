import { useState } from "react";

const useModal = (open = false): [ boolean, () => void ] => {
  const [ state, setState] = useState(open);

  const toggle = () => {
    setState(!state);
  }

  return [ state, toggle ];
}

export default useModal;
