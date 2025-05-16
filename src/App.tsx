import { useRef, useState } from "react";
import { useButton } from "react-aria";
import "./App.css";

export default function App() {
  const [eventTargetNames, setEventTargetNames] = useState<
    {
      name: string;
      time: string;
    }[]
  >([]);
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: (e) => {
        const time = new Date().toISOString();
        setEventTargetNames((prevNames) => [
          ...prevNames,
          { name: e.target.name, time },
        ]);
      },
    },
    ref
  );

  return (
    <div>
      <button
        className="buttonA"
        onClick={(e) => {
          const time = new Date().toISOString();
          setEventTargetNames((prevNames) => [
            ...prevNames,
            { name: e.target.name, time },
          ]);
        }}
        name="A"
      >
        Button A
      </button>
      <button className="buttonB" name="B" ref={ref} {...buttonProps}>
        Button B
      </button>
      <ul>
        {eventTargetNames.map(({ name, time }, index) => (
          <li key={index}>
            <strong>Event {index + 1}:</strong> {name}
            <strong>Time:</strong> {time}
          </li>
        ))}
      </ul>
    </div>
  );
}
