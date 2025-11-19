import disableUserInteraction from "./disableUserInteraction";
import extractStudentInfo from "./extractStudentInfo";

const injectedJS = 
`
  (function() {
    // Disable all user interactions in the website 
    ${disableUserInteraction}

    // Extract data from the website 
    ${extractStudentInfo}

    // this is required by react-native-webview on iOS
    true;
  })();
`;

export default injectedJS;

