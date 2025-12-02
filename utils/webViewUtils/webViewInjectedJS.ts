import disableUserInteraction from "./disableUserInteraction";
import extractStudentInfo from "./extractStudentInfo";

const injectedJS = `
  (function() {
    // Disable interactions only on protected pages (post-login)
    ${disableUserInteraction}

    // Extract only on profile page
    ${extractStudentInfo}

    true; // Required for iOS
  })();
`;

export default injectedJS;