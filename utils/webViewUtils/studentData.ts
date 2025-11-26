import { captilizeWord } from "../captilizeWord";

type StudentDataType = {
  firstname: string;
  surname: string;
  faculty: string;
  religion: string;
  gender: string
};

// Normalizes scraped portal data by converting all fields to proper title case 
const studentData = (data: StudentDataType) => {
  return {
    studentFirstname: captilizeWord(data.firstname),
    studentSurname: captilizeWord(data.surname),
    studentFaculty: captilizeWord(data.faculty),
    studentReligion: captilizeWord(data.religion),
    studentGender: captilizeWord(data.gender),
  };
};

export default studentData;
