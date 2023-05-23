import { Camera } from '../../types';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

type PaginationProps = {
  productsList: Camera[];
  productsPerPage: number;
  currentPage: number;
  onPaginationLinkClick:(pageNumber:number) => void;
  onPrevButtonClick: ()=> void;
  onNextButtonClick: ()=> void;
}

function Pagination({ productsList, productsPerPage, currentPage, onPaginationLinkClick, onPrevButtonClick, onNextButtonClick }: PaginationProps):JSX.Element {
  const numberOfPages: number[] = useMemo(() =>
  {
    const result: number[] = [];
    for (let i = 1; i <= Math.ceil(productsList.length / productsPerPage); i++) {
      result.push(i);
    }
    return result;
  }, [productsList.length, productsPerPage]);

  const isPrevButtonVisible = currentPage !== numberOfPages[0];
  const isNextButtonVisible = currentPage !== numberOfPages[numberOfPages.length - 1];

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isPrevButtonVisible &&
          <li
            className="pagination__item"
            onClick={() => onPrevButtonClick()}
          ><Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage - 1}`}>Back</Link>
          </li>
        }

        {
          numberOfPages.map((pageNumber) =>
            (
              <li key={pageNumber}
                className="pagination__item"
                onClick={() => onPaginationLinkClick(pageNumber)}
              >
                <Link
                  className={pageNumber === currentPage ? 'pagination__link pagination__link--active' : 'pagination__link'}
                  to={`/catalog/page_${pageNumber}`}
                  data-testid={pageNumber}
                >{pageNumber}
                </Link>
              </li>
            ))
        }

        {
          isNextButtonVisible &&
        <li
          className="pagination__item"
          onClick={() => onNextButtonClick()}
        ><Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage + 1}`}>Next</Link>
        </li>
        }
      </ul>
    </div>
  );
}

export default Pagination;
