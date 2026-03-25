# KitGlobal Blog App

A React + TypeScript blog application with full CRUD for posts and comments. Built with Firebase Firestore as the backend, Redux Toolkit for state management, and shadcn/ui for the interface.

🔗 **[DEMO LINK](https://<your_account>.github.io/kitglobal/)**

> Replace `<your_account>` with your GitHub username.

---

## Features

- Create, edit, delete posts
- Add, edit, delete comments per post
- Filter posts by title, content, and author
- Modal dialogs for creating and editing posts/comments
- Form validation with Zod + React Hook Form
- Real-time sync with Firebase Firestore
- Responsive UI with Tailwind CSS + shadcn/ui

---

## Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | React 18, TypeScript                  |
| State    | Redux Toolkit                         |
| Forms    | React Hook Form, Zod                  |
| UI       | shadcn/ui, Tailwind CSS, Lucide Icons |
| Backend  | Firebase Firestore                    |
| Routing  | React Router DOM v6                   |
| Build    | Vite                                  |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vovanchu/kitglobal.git
cd kitglobal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** (Native mode)
4. Set Firestore Rules for development:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Create a **composite index** for the comments query (Firestore will prompt you with a link in the browser console on first run):
   - Collection: `comments`
   - Fields: `postId` (Ascending), `createdAt` (Ascending)

---

## Project Structure

```
src/
├── app/
│   ├── store.ts                  # Redux store
│   └── features/
│       ├── posts/
│       │   ├── postSlice.ts      # Post actions & reducer
│       │   └── postAPI.ts        # Firestore CRUD for posts
│       ├── comments/
│       │   ├── commentsSlice.ts  # Comments actions & reducer
│       │   └── commentsAPI.ts    # Firestore CRUD for comments
│       └── ui/
│           └── uiSlice.ts        # Modal state (open/close, type, data)
├── components/
│   ├── PostForm.tsx              # Create/edit post modal form
│   ├── CommentsForm.tsx          # Add comment modal form
│   ├── CreatePostModal.tsx       # Dialog wrapper (routes PostForm/CommentsForm)
│   ├── PostCard.tsx              # Post list item
│   ├── Filter.tsx                # Search & author filter bar
│   ├── Header.tsx                # Header components with logo and button
│   └── Loader.tsx                # Loading spinner
├── firebase/
│   └── firebase.ts               # Firebase app initialization
├── schemas/
│   ├── postSchema.ts             # Zod schema for posts
│   └── commentSchema.ts          # Zod schema for comments
├── types/
│   ├── Post.ts                   # Post type
│   └── comments.ts               # Comment type
├── pages/
│   ├── Home.tsx                  # Posts list page
│   └── PostPage.tsx              # Single post + comments page
└── main.tsx                      # App entry point
```

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Environment Variables Reference

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

---

## Notes

- Comment count on the home page is taken from the Redux store — `fetchComments(postId)` is called on `PostPage` mount to keep it in sync.
- Modal state (`modalType`, `modalData`) lives in `uiSlice` — the `CreatePostModal` component renders either `PostForm` or `CommentsForm` based on `modalType`.
- `PostForm` and `CommentsForm` return only `<DialogContent>` — the parent `<Dialog>` wrapper lives exclusively in `CreatePostModal`.

---
