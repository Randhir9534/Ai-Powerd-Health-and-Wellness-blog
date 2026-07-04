import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from 'gsap';
import './BookMark.css';
import { fetchBookmarks, removeBookmarkApi } from '../../../Functions/Content';

const BookmarkPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: bookmarks = [], isLoading, error } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
    onError: () => {
      toast.error("Failed to load bookmarks");
    }
  });

  const { mutate: removeBookmark, isPending: removing } = useMutation({
    mutationFn: removeBookmarkApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success("Bookmark removed successfully");
    },
    onError: () => {
      toast.error("Failed to remove bookmark");
    }
  });

  useEffect(() => {
    const items = gsap.utils.toArray(".bookmark-item");

    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 2,
        ease: "power3.out",
      });
    });
  }, [bookmarks]);

  return (
    <Container maxWidth="lg" className="bookmark-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <Typography variant="h4" gutterBottom>Your Bookmarked Blogs</Typography>

      {isLoading ? (
        <Typography>Loading bookmarks...</Typography>
      ) : bookmarks?.data?.length === 0 ? (
        <Typography>You have no bookmarks yet.</Typography>
      ) : (
        <List>
          {bookmarks?.data.map((blog, index) => (
            <Box key={blog._id}>
              <ListItem
                className="bookmark-item"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: 2,
                  py: 2,
                }}
              >
                {/* Left Section */}
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    flex: 1,
                    alignItems: "flex-start",
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      minWidth: { xs: 70, sm: 90 },
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={`http://localhost:9001/${blog.image}`}
                      alt={blog.title}
                      sx={{
                        width: { xs: 65, sm: 80 },
                        height: { xs: 65, sm: 80 },
                        mr: 2,
                      }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            xs: "18px",
                            sm: "22px",
                          },
                        }}
                      >
                        {blog.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          mt: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        color="text.secondary"
                      >
                        {blog.content}
                      </Typography>
                    }
                  />
                </Box>

                {/* Buttons */}
                <Stack
                  direction={{ xs: "row", sm: "column" }}
                  spacing={1}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: { xs: "space-between", sm: "center" },
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    sx={{
                      minWidth: { xs: "140px", sm: "120px" },
                    }}
                  >
                    Read More
                  </Button>

                  <IconButton
                    onClick={() => removeBookmark(blog._id)}
                    disabled={removing}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItem>

              {index !== bookmarks.data.length - 1 && (
                <Divider sx={{ my: 1 }} />
              )}
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
};

export default BookmarkPage;
