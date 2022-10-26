import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../components/history-router/history-router';
import AddItemModal from './add-item-modal';
import { cameraData } from '../../../mockForTests';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();


describe('Component: AddItemModal', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <AddItemModal
          dataForAddItemModal={cameraData}
          onCloseClick={jest.fn()}
          isModalOpened
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toHaveClass('modal__btn');
  });

  it('should be closed when close button click', async () => {
    const closeButtonClickHandle = jest.fn();
    render(
      <HistoryRouter history={history}>
        <AddItemModal
          dataForAddItemModal={cameraData}
          onCloseClick={closeButtonClickHandle}
          isModalOpened
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toHaveClass('modal__btn');

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(closeButtonClickHandle).toBeCalled();
  });
});
