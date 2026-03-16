# Skohl - Campus Social & Marketplace App

**Skohl** is a mobile-first social platform built for students of Ahmadu Bello University (ABU). It combines a marketplace for buying/selling items, event discovery, service offerings, and real-time chat all in one clean, student-friendly app.

Think of it as:  
WhatsApp + Jiji + Eventbrite + campus group chats made just for uni students.

## Core Features

- **Marketplace**  
  Buy & sell products, services, and more with categories, photos, prices, and direct chat

- **Events & Campus Life**  
  Discover on/off-campus events, parties, tutorials, seminars with date, time & venue

- **Services Hub**  
  Offer or find tutoring, graphics design, hair styling, laundry, food delivery - student-to-student

- **Real-time 1-on-1 Chat**  
  Instant messaging with typing indicators, read receipts, and haptic feedback on send

- **User Profiles & Bookmarks**  
  Custom profiles, profile picture updates (Cloudinary), and bookmark favorite posts

- **Real-time Updates**  
  Live message sync, last-message previews in chat list, dynamic "other user" display

- **Beautiful & Performant UI**  
  Custom haptics, smooth animations, Expo Router file-based routing

## Tech Stack

- **Framework**: Expo (SDK 54) + React Native
- **State Management**: Zustand (lightweight) and React Context
- **Data Fetching**: TanStack Query
- **Backend**: Firebase (Firestore, Authentication)
- **Storage Bucket**: Cloudinary (uploads and deletes images)
- **Animation**: React Native Reanimated

## Project Structure

```
Skohl/
|-- app/
|   |-- _layout.tsx
|   |-- index.tsx
|   |-- apis/
|   |   |-- deleteCloudinaryImage.ts
|   |   `-- cloudinary/delete-image+api.ts
|   |-- (public)/(auth)/{_layout.tsx, index.tsx, Login.tsx, Register.tsx}
|   `-- (private)/
|       |-- (tabs)/{_layout.tsx, index.tsx, ChatsList.tsx, Events.tsx, Services.tsx, Profile.tsx}
|       |-- chatRoom/[id].tsx
|       |-- postDetails/[PostId].tsx
|       |-- editPosts/[EditPostId].tsx
|       |-- userProfilePicture/[id].tsx
|       `-- otherUserProfile/[otherUserId].tsx
|-- assets/ (audio, fonts, images, lottie)
|-- components/ (bottomSheet, chat, posts, auth, profile, verification, etc.)
|-- constants/ (colors, images, categories, audio config)
|-- contexts/ (e.g., AuthContext.tsx)
|-- firebase/ (bookmarks, chatRooms, posts, users, messages, feedbacks, collectionRef)
|-- hooks/ (data fetching, mutations, utilities)
|-- store/ (Zustand stores)
|-- styles/ (style modules)
|-- types/ (TypeScript definitions)
|-- urls/ (university URLs)
|-- utils/ (Cloudinary helpers, validation, formatting, webview helpers)
|-- scripts/reset-project.js
|-- app.json
|-- package.json
|-- tsconfig.json
`-- README.md
```

## Key Packages

- **Images**: expo-image, expo-image-picker, expo-image-manipulator (image resizing/compression before upload)
- **Crypto & Security**: expo-crypto (hashing for IDs or tokens)
- **Chat UI**: react-native-gifted-chat (custom bubbles, input, send button)
- **Keyboard Handling**: react-native-keyboard-controller (smooth keyboard avoidance & custom behavior)
- **Web Content Viewing**: react-native-webview (embedded browser for external links, previews, or web-based features)
- **Haptics**: expo-haptics (success/error feedback on send, post update, profile changes)
- **Audio (optional)**: expo-av (future success notification sounds)
- **Styling**: StyleSheet + custom hooks
- **Icons**: @expo/vector-icons
- **Lists**: @shopify/flash-list (fast FlatList replacement)
- **Bottom Sheets**: @gorhom/bottom-sheet
- **Date Formatting**: react-time-ago

## Prerequisites

To run or develop Skohl, you need:

- **Node.js** >= 18.x (recommended: latest LTS)
- **npm** >= 8.x or **yarn** / **pnpm**
- **Expo CLI** (installed globally): `npm install -g expo-cli`
- **Git** (for cloning the repo)
- **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator)
- **Expo Go** app on your physical device (for quick testing) - or a development build
- **Firebase project** (Firestore + Authentication setup) - add your config to `firebase.config.ts`
- **Cloudinary account** (for image uploads) - add credentials to your environment

Optional but recommended:

- **VS Code** + extensions: ESLint, Prettier, React Native Tools, Expo Tools
- **Android emulator** or **iOS simulator** (or physical device)

## Getting Started

1. Clone the repo

   ```bash
   git clone https://github.com/Oyabure-Zakari/skohl.git
   cd skohl

   ```

2. Install dependencies

   ```bash
   npm install
   # or yarn install

   ```

3. Start development server

   ```bash
   npx expo start --clear

   ```

4. Run on device/emulator:
   - iOS Simulator: press i
   - Android Emulator: press a
   - Expo Go: scan QR code

## Development Notes

- Real-time chat & chat list use Firestore onSnapshot + TanStack Query caching
- Profile updates use partial Firestore updates (only changed fields)
- Images handled via Cloudinary (upload + delete old on change)
- Haptic feedback on send/update success (expo-haptics)
- Chat rooms created dynamically with sorted participant array for array-contains queries

## Contributing

Feel free to open issues or PRs!

## License

MIT
Made with love for ABU students.
