import React, { memo } from 'react';

// 차시 로그 Hooks
const Try = memo(({ value, index }) => {
  return (
    <li>
      {index + 1}번째 시도 [{value.try}] : {value.result}
    </li>
  );
});
Try.displayName = 'Try';

export default Try;
