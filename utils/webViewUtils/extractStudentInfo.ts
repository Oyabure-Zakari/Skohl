const extractStudentInfo = 
`  // ======== Extract data from the website ========    
    // A helper function that finds the value of an input element
    const get = (id) => document.querySelector(id)?.value?.trim() || '';

    // A helper function that finds the value of a select element i.e dropdown menu
    const getReligion = () => {
      const select = document.querySelector('#religion');
      if (select && select.selectedOptions && select.selectedOptions[0]) {
        return select.selectedOptions[0].text.trim();
      }
      return '';
    };

    // Stores extracted elements
    const data = {
      surname:   get('#surname'),
      firstname: get('#firstname'),
      faculty:   get('#faculty'),
      gender:    get('#gender'),
      religion:  getReligion()                
    };

    // ======== Sends data from the webview to React Native ========
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'FORM_DATA',
      payload: data
    }));
`

export default extractStudentInfo