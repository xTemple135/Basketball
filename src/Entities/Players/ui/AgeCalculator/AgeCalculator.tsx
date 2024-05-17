import React, { useEffect, useState } from 'react';

interface AgeCalculatorProps {
  birthday: string;
}

const AgeCalculator: React.FC<AgeCalculatorProps> = ({ birthday }) => {
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    if (birthday) {
      const birthDate = new Date(birthday);
      const ageDiffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiffMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setAge(calculatedAge);
    }
  }, [birthday]);
  return <>{age !== undefined ? age : 'Calculating...'}</>;
};

export default AgeCalculator;
