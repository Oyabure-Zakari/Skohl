const extractStudentInfo = 
`  // ======== Extract data from the website ========    
if (window.location.href.includes('/notification/profile')) {
      const get = (id) => document.querySelector(id)?.value?.trim() || '';
      const getReligion = () => {
        const select = document.querySelector('#religion');
        if (select && select.selectedOptions && select.selectedOptions[0]) {
          return select.selectedOptions[0].text.trim();
        }
        return '';
      };

      const data = {
        surname: get('#surname'),
        firstname: get('#firstname'),
        faculty: get('#faculty'),
        gender: get('#gender'),
        religion: getReligion()
      };

      // Send data back
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'FORM_DATA',
        payload: data
      }));
    }
`

export default extractStudentInfo