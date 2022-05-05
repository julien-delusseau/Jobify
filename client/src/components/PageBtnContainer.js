import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (v, k) => k + 1);

  const prevPage = () => {
    if (page <= 1) return;
    changePage(page - 1);
  };

  const nextPage = () => {
    if (page >= numOfPages) return;
    changePage(page + 1);
  };

  return (
    <Wrapper>
      <button className="prev-btn" title="page précédente" onClick={prevPage}>
        <HiChevronDoubleLeft />
      </button>

      <div className="btn-container">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            className={page === pageNum ? "pageBtn active" : "pageBtn"}
            onClick={() => changePage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button className="prev-btn" title="page suivante" onClick={nextPage}>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
