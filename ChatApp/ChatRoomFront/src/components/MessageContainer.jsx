import Table from "react-bootstrap/Table";

// const MessageContainer = ({ messages }) => {
//   return (
//     <div>
//       {messages.map((message, index) => (
//         <Table striped bordered key={index}>
//           <tbody>
//             <tr>
//               <td>{message.msg}</td>
//             </tr>
//           </tbody>
//         </Table>
//       ))}
//     </div>
//   );
// };

// export default MessageContainer;

const MessageContainer = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => {
        return (
          <Table striped bordered key={index}>
            <tbody>
              <tr>
                <td>
                  {message.message} - {message.username}
                </td>
              </tr>
            </tbody>
          </Table>
        );
      })}
    </div>
  );
};

export default MessageContainer;
