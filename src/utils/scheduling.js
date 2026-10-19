const toDateString = (date) => {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


const addDays = (
  date,
  numberOfDays
) => {
  const result =
    new Date(date);

  result.setDate(
    result.getDate() +
    numberOfDays
  );

  return result;
};


export const getLaserSuggestedDate = ({
  lastSessionDate,
  intervalDays,
  lastPeriodStart,
  cycleLengthDays = 28,
  periodLengthDays = 5,
}) => {

  const suggestedDate =
    addDays(
      `${lastSessionDate}T00:00:00`,
      Number(intervalDays)
    );


  if (!lastPeriodStart) {
    return {
      suggestedDate:
        toDateString(
          suggestedDate
        ),

      adjustedDate:
        toDateString(
          suggestedDate
        ),

      hasConflict: false,
    };
  }


  let estimatedPeriodStart =
    new Date(
      `${lastPeriodStart}T00:00:00`
    );


  /* Move forward until we reach
     the period closest to the suggested visit. */

  while (
    addDays(
      estimatedPeriodStart,
      Number(cycleLengthDays)
    ) <= suggestedDate
  ) {
    estimatedPeriodStart =
      addDays(
        estimatedPeriodStart,
        Number(cycleLengthDays)
      );
  }


  const blockedStart =
    addDays(
      estimatedPeriodStart,
      -2
    );


  const blockedEnd =
    addDays(
      estimatedPeriodStart,
      Number(periodLengthDays) +
        1
    );


  const hasConflict =
    suggestedDate >= blockedStart &&
    suggestedDate <= blockedEnd;


  const adjustedDate =
    hasConflict
      ? addDays(
          blockedEnd,
          1
        )
      : suggestedDate;


  return {
    suggestedDate:
      toDateString(
        suggestedDate
      ),

    adjustedDate:
      toDateString(
        adjustedDate
      ),

    hasConflict,

    blockedStart:
      toDateString(
        blockedStart
      ),

    blockedEnd:
      toDateString(
        blockedEnd
      ),
  };
};