type UserProfileType = {
  uid: string;
  image: string;
  fullName: string;
  faculty: string;
  bio: string;
  joinedAt: {
    nanoseconds: number;
    seconds: number;
  };
};

export default UserProfileType;
