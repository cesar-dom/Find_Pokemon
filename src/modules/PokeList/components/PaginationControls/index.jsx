import React from "react";

const PaginationControls = ({ page, totalPages, onBackClick, onNextClick }) => {
  return (
    <div className="fixed flex px-3 gap-2 bg-white rounded-full">
      <button className="text-indigo-500 font-black text-xs" onClick={onBackClick}>{'<<'}</button>
      <span className="font-semibold text-indigo-500 text-sm">
        <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>
      <button className="text-indigo-500 font-black text-xs" onClick={onNextClick}>{'>>'}</button>
    </div>
  )
}

export default PaginationControls;