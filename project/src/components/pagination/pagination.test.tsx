import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Pagination from './pagination';
import { camerasList } from '../../mockForTests';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import { AppRoute } from '../../consts';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Pagination
          productsList={camerasList}
          productsPerPage={9}
          currentPage={1}
          onPaginationLinkClick={jest.fn}
          onPrevButtonClick={jest.fn}
          onNextButtonClick={jest.fn}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId(1)).toBeInTheDocument();
    expect(screen.getByTestId(2)).toBeInTheDocument();
    expect(screen.getByTestId(3)).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('when user click "Pagination button" (which number) should redirect', async () => {
    history.push(AppRoute.Main);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <Pagination
                productsList={camerasList}
                productsPerPage={9}
                currentPage={1}
                onPaginationLinkClick={jest.fn}
                onPrevButtonClick={jest.fn}
                onNextButtonClick={jest.fn}
              />
            }
          />
          <Route
            path={AppRoute.Catalog}
            element={<h1>Mock Catalog Page 2</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByTestId(2));

    expect(screen.getByText(/Mock Catalog Page 2/i)).toBeInTheDocument();
  });

  it('should be called callback "nextButtonClick" when clicked "Next" button', async () => {
    const nextButtonClickHandler = jest.fn();
    render(
      <HistoryRouter history={history}>
        <Pagination
          productsList={camerasList}
          productsPerPage={9}
          currentPage={1}
          onPaginationLinkClick={jest.fn}
          onPrevButtonClick={jest.fn}
          onNextButtonClick={nextButtonClickHandler}
        />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Next'));

    expect(nextButtonClickHandler).toBeCalled();
  });
});
