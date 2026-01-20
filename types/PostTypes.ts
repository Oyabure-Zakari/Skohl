type PostType = "event" | "service" | "product";

interface BasePost {
  id: string;
  title: string;
  category: string;
  description: string;
  postType: PostType;
  createdAt: { seconds: number; nanoseconds: number; type: string };
  photo?: string; // optional
  postedBy: {
    fullName: string;
    image?: string;
    userUid: string;
  };
}

// Event-specific fields
interface EventPost extends BasePost {
  postType: "event";
  eventDate: string;
  eventTime?: string;
  eventType?: string;
  eventVenue?: string;
}

// Service-specific fields
interface ServicePost extends BasePost {
  postType: "service";
  price?: string;
  serviceSchedule?: string;
}

// Product-specific fields
interface ProductPost extends BasePost {
  postType: "product";
  price?: string;
}

// Union type for all posts
export type Post = EventPost | ServicePost | ProductPost;