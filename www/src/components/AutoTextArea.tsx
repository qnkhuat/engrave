// Kudos to : https://gist.github.com/lucasalgus/6d2ebb83d57a5e0c18d294b8d391803b#file-react-auto-resize-textarea-3-tsx
import React, {
  useState,
  useEffect,
  useRef,
  TextareaHTMLAttributes,
} from "react";

const AutoTextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  useEffect(() => {
    setTextAreaHeight(`${ref.current!.scrollHeight + 10}px`);
  }, [text]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight("auto");
    setText(event.target.value);
    if (props.onChange)	props.onChange(event);
  };

  return (
    <textarea
      ref={ref}
      rows={1}
      style={{
        height: textAreaHeight,
      }}
      {...props}
      onChange={onChangeHandler}
    />
  );
};

export default AutoTextArea;
