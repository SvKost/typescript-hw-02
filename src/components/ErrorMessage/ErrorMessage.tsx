type MessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: MessageProps) => {
  return <p>{message}</p>;
};

export default ErrorMessage;
