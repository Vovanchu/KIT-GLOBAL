/* eslint-disable react-hooks/incompatible-library */
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "@/app/store";
import { openModal } from "@/app/features/ui/uiSlice";
import { useEffect } from "react";
import { createPost, editPost } from "@/app/features/posts/postSlice";

export const PostForm = () => {
  const modalType = useSelector((state: RootState) => state.ui.modalType);
  const modalData = useSelector((state: RootState) => state.posts.selectedPost);

  const defaultValues = {
    title: modalData?.title ?? "",
    author: modalData?.author ?? "",
    content: modalData?.content ?? "",
  };

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
    mode: "onTouched",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: PostFormValues) => {
    try {
      console.log("type:", modalType);

      if (modalType === "createPost") {
        await dispatch(
          createPost({
            ...values,
            createdAt: Date.now(),
          }),
        ).unwrap();

        form.reset();
        dispatch(openModal({ type: "" }));
      } else if (modalType === "editPost" && modalData?.id) {
        await dispatch(editPost({ ...modalData, ...values })).unwrap();

        form.reset();
        dispatch(openModal({ type: "" }));
      }

      console.log("type:", modalType);
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  const contentLength = form.watch("content").length;

  useEffect(() => {
    if (modalType === "editPost" && modalData) {
      form.reset({
        title: modalData.title,
        author: modalData.author,
        content: modalData.content,
      });
    } else if (modalType === "createPost") {
      form.reset({
        title: "",
        author: "",
        content: "",
      });
    }
  }, [modalType, modalData, form]);

  return (
    <DialogContent className="sm:max-w-120 gap-0 p-0 overflow-hidden rounded-2xl [&>button]:text-muted-foreground [&>button]:cursor-pointer bg-muted">
      {/* Header */}
      <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
        <DialogTitle className="text-lg font-semibold tracking-tight text-muted-foreground">
          {modalType === "createPost" ? "New Post" : "Edit Post"}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Fill in the details. All fields are required.
        </DialogDescription>
      </DialogHeader>

      {/* Body */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="px-6 py-5 flex flex-col gap-5"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      modalType === "createPost"
                        ? "What's on your mind?"
                        : "Edit title"
                    }
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name…"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-foreground">Content</FormLabel>
                  <span
                    className={`text-xs tabular-nums ${
                      contentLength > 4800
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {contentLength}/5000
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder={
                      modalType === "createPost"
                        ? "Write your post content…"
                        : "Edit content"
                    }
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none min-h-30"
                    maxLength={5000}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Footer */}
          <DialogFooter className="pt-2 flex gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer text-primary"
              onClick={() => dispatch(openModal({ type: "" }))}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-2 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
