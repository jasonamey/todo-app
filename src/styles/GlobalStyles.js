import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


body {
    padding : 0; 
    margin : 0;
    box-sizing : border-box;
    font-family: "Josefin Sans", sans-serif;
    height : 100vh;
    width : 100%;
    display : flex; 
    justify-content : center;
    background-color: ${({ theme }) => theme.backgroundColor}; 
    background-image : ${({ theme }) => theme.desktopHeaderImg};
    background-repeat :  no-repeat;
    background-size : 100%;
    transition : background-color .5s;

}

ul { 
    padding : 0px;
    margin : 0px;
}
a {

    text-decoration : none;
}

@media only screen and (max-width: 530px) {
    body {
    
    background-image : ${({ theme }) => theme.mobileHeaderImg};
    
    }
}
`;
