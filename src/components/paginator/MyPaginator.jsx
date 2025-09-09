import React, { useMemo } from "react";
import styles from "./MyPaginator.module.scss";

const range = (from, to, step = 1) => {
  let i = from;
  const arr = [];
  while (i <= to) {
    arr.push(i);
    i += step;
  }
  return arr;
};

const MyPaginator = ({
  totalRecords = 0,
  pageLimit = 10,
  pageNeighbours = 1,
  setOffset,
  currentPage,
  setCurrentPage,
  pagePrevText = "‹",
  pageNextText = "›",
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const fetchPageNumbers = useMemo(() => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = ["LEFT", ...extraPages, ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, "RIGHT"];
      } else if (hasLeftSpill && hasRightSpill) {
        pages = ["LEFT", ...pages, "RIGHT"];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }, [totalPages, currentPage, pageNeighbours]);

  const gotoPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    const newOffset = (newPage - 1) * pageLimit;
    setCurrentPage(newPage);
    setOffset(newOffset);
  };

  const handleMoveLeft = () => gotoPage(currentPage - pageNeighbours * 2 - 1);
  const handleMoveRight = () => gotoPage(currentPage + pageNeighbours * 2 + 1);

  if (!totalRecords || totalPages === 1) return null;

  return (
    <ul className={`${styles['分頁器']} 分頁器`}>
      <li>
        <button
          className={`${styles['分頁按鈕']} 分頁按鈕`}
          onClick={() => gotoPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {pagePrevText}
        </button>
      </li>

      {fetchPageNumbers.map((page, index) => {
        if (page === "LEFT")
          return (
            <li key={index}>
              <button className={`${styles['分頁按鈕']} 分頁按鈕`} onClick={handleMoveLeft}>
                …
              </button>
            </li>
          );

        if (page === "RIGHT")
          return (
            <li key={index}>
              <button className={`${styles['分頁按鈕']} 分頁按鈕`} onClick={handleMoveRight}>
                …
              </button>
            </li>
          );

        return (
          <li key={index}>
            <button
              className={`${styles['分頁按鈕']} 分頁按鈕 ${
                currentPage === page ? `${styles['激發']} 激發` : ""
              }`}
              onClick={() => gotoPage(page)}
            >
              {page}
            </button>
          </li>
        );
      })}

      <li>
        <button
          className={`${styles['分頁按鈕']} 分頁按鈕`}
          onClick={() => gotoPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {pageNextText}
        </button>
      </li>
    </ul>
  );
};

export default MyPaginator;