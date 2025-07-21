import React, { useEffect, useState, useMemo } from "react";

const Pagination = React.memo(({ totalPages, currentPage, onPageChange }) => {
  const visiblePages = useMemo(() => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    button: (active) => ({
      padding: "8px 12px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      cursor: active ? "default" : "pointer",
      backgroundColor: active ? "#007bff" : "#fff",
      color: active ? "#fff" : "#333",
      fontWeight: active ? "bold" : "normal",
    }),
    ellipsis: {
      padding: "8px 12px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <button
        style={styles.button(false)}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ⬅ Prev
      </button>

      {visiblePages.map((page, i) =>
        page === "..." ? (
          <span key={i} style={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={i}
            style={styles.button(currentPage === page)}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        style={styles.button(false)}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next ➡
      </button>
    </div>
  );
});

const PaginationWrapper = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 2;

  // Fetch posts once
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const currentPosts = useMemo(() => {
    const start = (page - 1) * postsPerPage;
    return posts.slice(start, start + postsPerPage);
  }, [posts, page]);

  const styles = {
    postCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "12px",
      margin: "10px 0",
      textAlign: "left",
    },
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "sans-serif",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Paginated Posts</h2>
      {currentPosts.map((post) => (
        <div key={post.id} style={styles.postCard}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
      <Pagination
        totalPages={Math.ceil(posts.length / postsPerPage)}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default PaginationWrapper;
