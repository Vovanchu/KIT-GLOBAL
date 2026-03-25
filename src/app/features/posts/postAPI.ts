import { db } from "@/firebase/firebase";
import { Post } from "@/types/Post";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDoc,
} from "firebase/firestore";

export const fetchPostsFromFirestore = async (): Promise<Post[]> => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Post);
};

export const fetchPostFromFirestore = async (
  postId: string,
): Promise<Post | null> => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Post;
};

export const addPostToFirestore = async (
  post: Omit<Post, "id">,
): Promise<Post> => {
  const docRef = await addDoc(collection(db, "posts"), post);
  return { id: docRef.id, ...post };
};

export const updatePostInFirestore = async (post: Post) => {
  const postRef = doc(db, "posts", post.id);
  await updateDoc(postRef, {
    title: post.title,
    content: post.content,
    author: post.author,
  });
};

export const deletePostFromFirestore = async (postId: string) => {
  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, where("postId", "==", postId));
  const snapshot = await getDocs(q);

  const deletePromises = snapshot.docs.map((commentDoc) =>
    deleteDoc(doc(db, "comments", commentDoc.id)),
  );
  await Promise.all(deletePromises);

  await deleteDoc(doc(db, "posts", postId));
};
