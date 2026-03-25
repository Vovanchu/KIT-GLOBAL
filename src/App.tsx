import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "./components/Header";
import { CreatePostModal } from "./components/ModalForm";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <CreatePostModal />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <AppRoutes />
      </main>
    </div>
  );
}
