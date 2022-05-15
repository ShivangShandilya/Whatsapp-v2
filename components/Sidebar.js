import styled from "styled-components";
import { Avatar, IconButton , Button } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where("users", "array-contains", user.email)
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = ()=>{
    const input = prompt(
        "Please enter an emsil address for the user you wish to chat with"
        );

    if (!input) return null;

    if (EmailValidator.validate(input) &&
     !chatAlreadyExists(input) && 
     input !== user.email
     ) {
        // We need to add the chat into the DB 'chats' collection if it doesn't already exists.
     db.collection('chats').add({
         users: [user.email, input],
     });
    }
    };

    const chatAlreadyExists = (recipientEmail) =>
     !!chatsSnapshot?.docs.find(
         (chat) => 
         chat.data().users.find((user) => user === recipientEmail)?.length > 0
         );

    return(
        <Container>
         <Header>
          <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>

          <IconsContainer>
          <IconButton>
              <ChatIcon />
          </IconButton>
          <IconButton>
               <MoreVertIcon />
            </IconButton>
          </IconsContainer>
         </Header>

         <Search>
           <SearchIcon />
           <SearchInput  placeholder="Search in Chats"/>
         </Search>

         <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
 
         {/*List of Chats*/}
         {chatsSnapshot?.docs.map((chat) => (
             <Chat key={chat.id} id={chat.id} users={chat.data().users} />
         ))}
        </Container>
    );
}

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
display:flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SidebarButton = styled(Button)`
width: 100%;

&&&{
    border-top: 1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
}
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;

const Header = styled.div`
 display: flex;
 position: sticky;
 top: 0;
 background-color: white;
 z-index: 1;
 justify-content: space-between;
 align-items: center;
 padding: 15px;
 height: 80px;
 border-bottom:  1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;

 :hover {
     opacity: 0.8;
 }
`;

const IconsContainer = styled.div``;