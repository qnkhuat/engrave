import { useState } from "react";

const useModal = (open = false): [ boolean, (value: boolean) => void ] => {
  const [ state, setState] = useState(open);

  const toggle = (value: boolean) => {
    setState(value);
  }

  return [ state, toggle ];
}

export default useModal;
