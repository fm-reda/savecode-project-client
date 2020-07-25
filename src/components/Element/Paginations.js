import React from "react";
import { Pagination } from "react-bootstrap";

const Paginations = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  let active = 1;
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(totalPosts / postsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      {/* <ul>
        {pageNumbers.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul> */}

      {/* <Pagination>{items}</Pagination>
      <br /> */}
      <Pagination>
        <Pagination.First
          disabled={currentPage == 1}
          onClick={() => paginate(1)}
        />
        <Pagination.Prev
          disabled={currentPage == 1}
          onClick={() => paginate(currentPage - 1)}
        />
        {pageNumbers.map((item, i) => (
          <Pagination.Item
            key={i}
            className="fs bg-success"
            onClick={() => paginate(item)}
            active={item == currentPage}
          >
            {item}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage == pageNumbers[pageNumbers.length - 1]}
          onClick={() => paginate(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage == pageNumbers[pageNumbers.length - 1]}
          onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
        />
      </Pagination>
      {/* <Pagination.Ellipsis /> */}
      {/* 
      <Pagination size="lg">{items}</Pagination>
      <br />

      <Pagination size="sm">{items}</Pagination> */}
      {/* <Pagination.Ellipsis /> */}

      {/* <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>
  
  <Pagination.Item>{20}</Pagination.Item> */}
    </>
  );
};

export default Paginations;
