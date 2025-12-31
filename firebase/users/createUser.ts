import { db } from '@/firebase/firebase.config';
import StudentInfoType from '@/types/StudentInfoType';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

  const createUser = async (
    uid: string,
    uploadedImageUrl: string,
    studentInfo: StudentInfoType,
    setError: (error: string) => void
  ) => {
    try {
      await setDoc(doc(db, "users", uid), {
        uid: uid,
        image: uploadedImageUrl,
        firstname: studentInfo.firstname,
        surname: studentInfo.surname,
        faculty: studentInfo.faculty,
        gender: studentInfo.gender,
        religion: studentInfo.religion,
        bio: "",
        joinedAt: serverTimestamp(),
      });
    } catch (error: any) {
      setError(`Error creating user ${error.message}`);
    }
  };



export default createUser;