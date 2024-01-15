import "./Message.css";

export interface MessageProps {
  msg: string;
  type: string;
}

function Message({ msg, type }: MessageProps) {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
}

export default Message;
