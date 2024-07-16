import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  itemsPerPage: number;
  items: any[];
  ItemsComponent: React.ComponentType<{ currentItems: any[] }>;
}

export default function Pagination({
  itemsPerPage,
  items,
  ItemsComponent
}: PaginationProps) {
  const [itemOffset, setItemOffset] = useState<number>(0);

  const endOffset : number = itemOffset + itemsPerPage;
  const currentItems : any[] = items.slice(itemOffset, endOffset);
  const pageCount : number = Math.ceil(items.length / itemsPerPage);

  // Invoke when user clicks to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ItemsComponent currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaArrowRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FaArrowLeft />}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
