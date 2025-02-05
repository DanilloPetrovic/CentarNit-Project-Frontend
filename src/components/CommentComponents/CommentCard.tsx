import { Comment, Task, User } from "../../interfaces/interfaces";
import { Box, Button, TextField, Typography } from "@mui/material";
import { formatDate } from "../../pages/Home/HomeFunctions";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteComment,
  getComments,
} from "../../pages/SingleProject/SingleProjectFunctions";
import { useEffect, useState } from "react";
import {
  getReplies,
  createReply,
  deleteReply,
} from "../../pages/SingleProject/SingleProjectFunctions";

interface props {
  comment: Comment;
  token: string | null;
  setComments: any;
  task: Task;
  user: User;
}

const CommentCard = ({ comment, token, setComments, task, user }: props) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState<string>("");

  const [repliesShow, setRepliesShow] = useState<boolean>(false);

  const deleteCommentFn = async () => {
    await deleteComment(comment.id, token);
  };

  useEffect(() => {
    const getRepliesFn = async () => {
      const replies = await getReplies(Number(comment.id), token);

      setReplies(replies);
    };

    getRepliesFn();
  }, [comment, token]);

  const createReplyFn = async () => {
    if (replyContent.length !== 0 && replyContent.length < 51 && user) {
      const values = {
        commentId: comment.id,
        userIdProp: user.id,
        content: replyContent,
      };

      await createReply(values, token);
      setReplyContent("");
    } else {
      alert("Comment must have between 1 and 50 characters");
    }
  };

  return (
    <Box
      sx={{
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          color: "lightgrey",
          fontWeight: "bold",
          display: "Flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {comment.user.username}{" "}
        <span style={{ fontSize: "13px" }}>
          {formatDate(comment.createdAt)}
        </span>
      </Typography>
      <Typography sx={{ color: "white", fontSize: "18px" }}>
        {comment.content}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          sx={{
            padding: "2px",
            minWidth: "auto",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setRepliesShow((prev) => !prev)}
        >
          <CommentIcon sx={{ color: "white", fontSize: "18px" }} />
        </Button>
        {comment.userId === user.id ? (
          <Button
            sx={{
              padding: "3px",
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
            }}
            onClick={async () => {
              if (window.confirm("Are you sure?")) {
                deleteCommentFn();
              }
              const commentsNew = await getComments(Number(task.id), token);
              setComments(commentsNew);
            }}
          >
            <DeleteIcon sx={{ color: "white", fontSize: "18px" }} />
          </Button>
        ) : null}
      </Box>

      <Box
        sx={{
          display: repliesShow ? "block" : "none",
          marginTop: "5px",
          bgcolor: "#2e3640",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {replies.length > 0 ? (
          replies.map((reply) => (
            <Box key={reply.id}>
              <Typography
                sx={{
                  color: "lightgrey",
                  fontWeight: "bold",
                  display: "Flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                {reply.user.username}{" "}
                <span style={{ fontSize: "12px" }}>
                  {formatDate(reply.createdAt)}
                </span>
              </Typography>
              <Typography sx={{ color: "white", fontSize: "16px" }}>
                {reply.content}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {reply.userId === user.id ? (
                  <Button
                    sx={{
                      padding: "3px",
                      minWidth: "auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={async () => {
                      if (window.confirm("Are you sure?")) {
                        await deleteReply(reply.id, token);
                      }
                      const replies = await getReplies(
                        Number(comment.id),
                        token
                      );

                      setReplies(replies);
                    }}
                  >
                    <DeleteIcon sx={{ color: "white", fontSize: "18px" }} />
                  </Button>
                ) : null}
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "white" }}>
              There are no replies
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <TextField
            label="Add reply"
            variant="filled"
            size="small"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
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
              createReplyFn();
              const replies = await getReplies(Number(comment.id), token);
              setReplies(replies);
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentCard;
