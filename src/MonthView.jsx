import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';
import WeekNumbers from './MonthView/WeekNumbers';

import { CALENDAR_TYPES, CALENDAR_TYPE_LOCALES } from './shared/const';
import { isCalendarType } from './shared/propTypes';

function getCalendarTypeFromLocale(locale) {
  return (
    Object.keys(CALENDAR_TYPE_LOCALES).find((calendarType) =>
      CALENDAR_TYPE_LOCALES[calendarType].includes(locale),
    ) || CALENDAR_TYPES.ISO_8601
  );
}

export default function MonthView(props) {
  const { activeStartDate, locale, onMouseLeave, showFixedNumberOfWeeks } = props;
  const {
    calendarType = getCalendarTypeFromLocale(locale),
    formatShortWeekday,
    formatWeekday,
    onClickWeekNumber,
    showWeekNumbers,
    ...childProps
  } = props;

  function renderWeekdays() {
    return (
      <Weekdays
        calendarType={calendarType}
        formatShortWeekday={formatShortWeekday}
        formatWeekday={formatWeekday}
        locale={locale}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null;
    }

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickWeekNumber={onClickWeekNumber}
        onMouseLeave={onMouseLeave}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
      />
    );
  }

  function renderDays() {
    return <Days calendarType={calendarType} {...childProps} />;
  }

  const className = 'react-calendar__month-view';

  return (
    <div className={clsx(className, showWeekNumbers ? `${className}--weekNumbers` : '')}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {renderWeekNumbers()}
        <div
          style={{
            flexGrow: 1,
            width: '100%',
          }}
        >
          {renderWeekdays()}
          {renderDays()}
        </div>
      </div>
    </div>
  );
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  formatDay: PropTypes.func,
  formatLongDate: PropTypes.func,
  formatShortWeekday: PropTypes.func,
  formatWeekday: PropTypes.func,
  locale: PropTypes.string,
  onClickWeekNumber: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
};
