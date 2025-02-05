import { Box, Button, TextField, Typography } from "@mui/material";
import { Task } from "../interfaces/interfaces";
import { useEffect, useState } from "react";
import {
  createComment,
  getComments,
} from "../pages/SingleProject/SingleProjectFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CommentCard from "./CommentComponents/CommentCard";

interface props {
  isOpen: boolean;
  task: Task;
}

const Comments = ({ isOpen, task }: props) => {
  const token = localStorage.getItem("token");
  const user = useSelector((state: RootState) => state.user);
  const [comments, setComments] = useState<any[]>();
  const [commentContent, setCommentContent] = useState<string>("");

  useEffect(() => {
    const getCommentsFn = async () => {
      const comments = await getComments(Number(task.id), token);

      setComments(comments);
    };

    getCommentsFn();
  }, [token, task]);

  const createCommentFn = async () => {
    if (commentContent.length !== 0 && commentContent.length < 51 && user) {
      const values = {
        userId: user.id,
        taskId: task.id,
        content: commentContent,
      };

      await createComment(values, token);
      setCommentContent("");
    } else {
      alert("Comment must have between 1 and 50 characters");
    }
  };

  if (!isOpen) return null;
  return (
    <Box sx={{ padding: "0px 10px 10px 10px" }}>
      <Typography variant="h6" sx={{ color: "white" }}>
        Comments:
      </Typography>

      <Box sx={{ display: "flex", gap: "10px" }}>
        <TextField
          label="Add comment"
          variant="filled"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          size="small"
          sx={{
            width: "100%",
            input: { color: "white" },
            label: { color: "#B0BEC5" },
            ".MuiFilledInput-root": {
              backgroundColor: "#232931",
              padding: "0px",
            },
          }}
        />
        <Button
          sx={{
            color: "white",
            bgcolor: "#4ECCA3",
            ":hover": { bgcolor: "#387a65" },
          }}
          onClick={async () => {
            createCommentFn();
            const commentsNew = await getComments(Number(task.id), token);
            setComments(commentsNew);
          }}
        >
          Add
        </Button>
      </Box>

      {comments !== undefined && comments.length > 0 ? (
        comments?.map((comment) => (
          <CommentCard
            comment={comment}
            token={token}
            setComments={setComments}
            task={task}
            key={comment.id}
            user={user}
          />
        ))
      ) : (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            sx={{ fontSize: "18px", color: "darkgrey", marginTop: "15px" }}
          >
            There are no comments
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Comments;
