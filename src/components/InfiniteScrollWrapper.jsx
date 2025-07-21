import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScrollWrapper = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  // Fetch comments in chunks
  const fetchComments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const limit = 5;
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
    );
    const data = await res.json();
    setComments((prev) => [...prev, ...data]);
    if (data.length < limit) setHasMore(false);
    setLoading(false);
  };

  // Observe the last item for intersection
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Infinite Comments</h2>
      {comments.map((comment, idx) => (
        <div
          key={comment.id}
          style={styles.card}
          ref={idx === comments.length - 1 ? lastElementRef : null}
        >
          <h4 style={styles.name}>{comment.name}</h4>
          <p style={styles.body}>{comment.body}</p>
          <p style={styles.email}>{comment.email}</p>
        </div>
      ))}
      {loading && <p style={styles.loading}>Loading...</p>}
      {!hasMore && <p style={styles.end}>No more comments!</p>}
    </div>
  );
};

export default InfiniteScrollWrapper;

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "0 1rem",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  card: {
    padding: "1rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  name: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  body: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  email: {
    fontSize: "0.85rem",
    color: "#555",
  },
  loading: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: "1rem",
  },
  end: {
    textAlign: "center",
    marginTop: "1rem",
    color: "gray",
  },
};
