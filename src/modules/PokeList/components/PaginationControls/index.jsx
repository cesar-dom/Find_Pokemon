import React from "react";

const PaginationControls = ({ page, totalPages, onBackClick, onNextClick }) => {
  return (
    <div className="fixed flex px-4 gap-2 bg-white rounded-full">
      <button className="font-light" onClick={onBackClick}>Voltar</button>
      <span className="font-semibold text-indigo-500">
        <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>
      <button className="font-light" onClick={onNextClick}>Avaçar</button>
    </div>
  )
}

export default PaginationControls;