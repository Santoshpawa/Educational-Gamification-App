import "../styles/message.css";

export default function Message({ message }) {
  console.log("I have a message to display.")
  return <div class="message">{message}</div>;
}
