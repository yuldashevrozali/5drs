import { useEffect, useState } from "react";
import './App.css'
import useTextToSpeech from "./useTextToSpeech";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
console.log(recognition);

const App = () => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleVoiceEnd = () => {
    setListening(false);
    handleAddTodo(); 
  };

  const handleVoiceResult = (e) => {
    const transcript = e.results[0][0].transcript;
    setText(transcript);

    const isHello = todos.some((todo) =>
      transcript.toLowerCase().includes(todo.text.toLowerCase())
    );

    if (isHello) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  const handleStartVoice = () => {
    setListening(true);
    recognition.start();
  };

  const handleAddTodo = () => {
    if (text.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setText("");
    }
  };

  const handleAddTextTodo = () => {
    handleAddTodo();
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleDeleteByText = (textToDelete) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.text !== textToDelete));
  };

  useEffect(() => {
    recognition.addEventListener("result", handleVoiceResult);
    recognition.addEventListener("end", handleVoiceEnd);

    return () => {
      recognition.removeEventListener("result", handleVoiceResult);
      recognition.removeEventListener("end", handleVoiceEnd);
    };
  }, [text, todos]);

  useTextToSpeech();

  return (
    <div>
      <div className="Card">
        <h1>{text}</h1>
        <button id="btn" onClick={handleStartVoice}>
          {listening ? "Listening..." : "Start Voice"}
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo..."
        />
        <button id="btn2" onClick={handleAddTextTodo}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleDelete(todo.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
              <button onClick={() => handleDeleteByText(todo.text)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                  <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
