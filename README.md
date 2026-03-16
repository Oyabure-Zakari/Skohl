# Skohl – Campus Social & Marketplace App

**Skohl** is a mobile-first social platform built for university students in Nigeria. It combines a marketplace for buying/selling items, event discovery, service offerings, and real-time chat all in one clean, student-friendly app.

Think of it as:  
WhatsApp + Jiji + Eventbrite + campus group chats made just for uni students.

## Core Features

- **Marketplace**  
  Buy & sell products, services, and more — with categories, photos, prices, and direct chat

- **Events & Campus Life**  
  Discover on/off-campus events, parties, tutorials, seminars with date, time & venue

- **Services Hub**  
  Offer or find tutoring, graphics design, hair styling, laundry, food delivery — student-to-student

- **Real-time 1-on-1 Chat**  
  Instant messaging with typing indicators, read receipts, and haptic feedback on send

- **User Profiles & Bookmarks**  
  Custom profiles, profile picture updates (Cloudinary), bookmark favorite posts

- **Real-time Updates**  
  Live message sync, last-message previews in chat list, dynamic "other user" display

- **Beautiful & Performant UI**  
  Dark mode support, custom haptics, smooth animations, Expo Router file-based routing

## Tech Stack & Key Packages

- **Framework**: Expo (SDK 54) + React Native
- **Routing**: Expo Router (file-based)
- **State Management**: Zustand (lightweight), React Context
- **Data Fetching & Real-time**: TanStack Query + Firebase Firestore (onSnapshot)
- **Backend**: Firebase (Firestore, Authentication)
- **Image Handling**: Cloudinary (uploads, deletes), expo-image
- **Chat UI**: react-native-gifted-chat (custom bubbles, input, send button)
- **Web Content Viewing**: react-native-webview (embedded browser for external links, previews, or web-based features)
- **Haptics**: expo-haptics (success/error feedback on send, post update, profile changes)
- **Audio (optional)**: expo-av (future success notification sounds)
- **Styling**: StyleSheet + custom hooks
- **Icons**: @expo/vector-icons
- **Lists**: @shopify/flash-list (fast FlatList replacement)
- **Bottom Sheets**: @gorhom/bottom-sheet
- **Date Formatting**: react-time-ago

## Getting Started

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/skohl.git
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
Especially welcome:

## Bug fixes

New category icons
Performance improvements
Dark mode polish

## License

MIT
Made with ❤️ for Nigerian students.
