import { db } from "@/firebase/firebase";
import { Comment } from "@/types/comments";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  increment,
  getDoc,
} from "firebase/firestore";

export const fetchCommentsFromFirestore = async (
  postId: string,
): Promise<Comment[]> => {
  const q = query(collection(db, "comments"), where("postId", "==", postId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Comment);
};

export const addCommentToFirestore = async (
  comment: Omit<Comment, "id">,
): Promise<Comment> => {
  const docRef = await addDoc(collection(db, "comments"), comment);

  const postRef = doc(db, "posts", comment.postId);
  await updateDoc(postRef, { commentsCount: increment(1) });

  return { id: docRef.id, ...comment };
};

export const updateCommentInFirestore = async (comment: Comment) => {
  const commentRef = doc(db, "comments", comment.id);
  await updateDoc(commentRef, {
    content: comment.content,
    author: comment.author,
  });
};

export const deleteCommentFromFirestore = async (id: string) => {
  const commentRef = doc(db, "comments", id);

  const commentSnap = await getDoc(commentRef);
  if (!commentSnap.exists()) return;

  const commentData = commentSnap.data();
  const postId = commentData.postId;

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { commentsCount: increment(-1) });

  await deleteDoc(commentRef);
};
