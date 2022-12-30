import React, { useRef, useState } from 'react';

const RSPHooks = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);

  const interval = useRef();
  const onoff = useRef(true);
  /*
  Hooks는 라이프사이클이 없지만 흉내는 낼 수 있다.

  */
  return (
    <>
      <div>Hooks</div>
    </>
  );
};
export default RSPHooks;
