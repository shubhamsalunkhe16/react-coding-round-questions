import React, { useState } from "react";

const fileTree = [
  {
    type: "folder",
    name: "src",
    children: [
      { type: "file", name: "index.js" },
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.jsx" },
          { type: "file", name: "Footer.jsx" },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "public",
    children: [{ type: "file", name: "favicon.ico" }],
  },
  { type: "file", name: "package.json" },
];

const styles = {
  tree: {
    fontFamily: "monospace",
    paddingLeft: "1rem",
    lineHeight: "1.8",
  },
  item: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  folder: {
    fontWeight: "bold",
    color: "#007acc",
  },
  file: {
    color: "#333",
  },
};

const TreeNode = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === "folder";
  const indent = { paddingLeft: `${level * 16}px` };

  const handleToggle = () => {
    if (isFolder) setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        style={{ ...styles.item, ...indent }}
        role="treeitem"
        aria-expanded={isFolder ? isOpen : undefined}
        aria-label={node.name}
        onClick={handleToggle}
      >
        <span style={isFolder ? styles.folder : styles.file}>
          {isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}
        </span>
      </div>

      {isFolder && isOpen && node.children && (
        <div role="group">
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorerWrapper = () => {
  return (
    <div role="tree" aria-label="File explorer" style={styles.tree}>
      {fileTree.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </div>
  );
};

export default FileExplorerWrapper;
