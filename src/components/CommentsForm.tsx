import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "@/app/store";
import { openModal } from "@/app/features/ui/uiSlice";
import { createComment } from "@/app/features/comments/commentsSlice";
import { commentSchema, CommentFormValues } from "@/schemas/commentSchema";

export const CommentsForm = () => {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { author: "", content: "" },
    mode: "onChange",
  });

  const modalData = useSelector((state: RootState) => state.posts.selectedPost);
  const modalType = useSelector((state: RootState) => state.ui.modalType);

  const open = modalType !== "";
  const dispatch = useDispatch<AppDispatch>();
  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: CommentFormValues) => {
    try {
      await dispatch(
        createComment({
          postId: modalData?.id as string,
          author: values.author,
          content: values.content,
          createdAt: Date.now(),
        }),
      ).unwrap();

      form.reset();

      dispatch(openModal({ type: "" }));
    } catch (err) {
      console.error("Failed to save comment:", err);
    }
  };

  const contentLength = form.watch("content").length;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(openModal({ type: "" }));
        }
      }}
    >
      <DialogContent className="sm:max-w-120 gap-0 p-0 overflow-hidden rounded-2xl [&>button]:text-muted-foreground [&>button]:cursor-pointer bg-muted">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-lg font-semibold tracking-tight text-muted-foreground">
            New Comment
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the details. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-6 py-5 flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name…"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                      placeholder="Write your comment…"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none min-h-30"
                      maxLength={5000}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                onClick={() => {
                  form.handleSubmit(handleSubmit)();
                }}
                className="flex-2 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
