import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Text, Popover } from 'src/components';
import { defaultInputStyles } from 'src/components/DefaultInput/DefaultInput';
import { classnames } from 'src/utils';

import { defaultTableInputStyles } from '../TableDefaultInput/TableDefaultInput';

import styles from './TableDateInput.module.scss';

const TableDateInput = ({ isError, min, max, value, onChange }) => {
  const [isOpened, setIsOpened] = useState(false);
  const date = value?.split('-').reverse().join('.');

  const toggleOpen = () => setIsOpened(!isOpened);
  const handleClose = () => setIsOpened(false);

  const handleOnChangeDate = (date) => {
    onChange(date.toLocaleDateString().split('.').reverse().join('-'));
    setIsOpened(false);
  };

  return (
    <Popover
      isOpened={isOpened}
      handleClose={handleClose}
      content={
        <ReactCalendar
          locale="ru-RU"
          value={value ? new Date(value) : new Date()}
          minDate={new Date(min)}
          maxDate={new Date(max)}
          onChange={handleOnChangeDate}
        />
      }
    >
      <button
        className={classnames([
          defaultTableInputStyles.input,
          styles.button,
          [defaultInputStyles.input__error, isError],
        ])}
        onClick={toggleOpen}
      >
        <div className={styles.textPosition}>
          <Text color={value ? 'black' : 'default'} size="l">
            {date || 'Дата'}
          </Text>
        </div>
      </button>
    </Popover>
  );
};

export default TableDateInput;
