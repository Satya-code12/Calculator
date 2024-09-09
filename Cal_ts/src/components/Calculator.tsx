import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    switch (value) {
      case 'C':
        setDisplayValue('0');
        setOperator(null);
        setFirstValue(null);
        setWaitingForSecondValue(false);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        setOperator(value);
        setFirstValue(displayValue);
        setWaitingForSecondValue(true);
        break;
      case '=':
        if (firstValue !== null && operator !== null) {
          const result = evaluate(parseFloat(firstValue), parseFloat(displayValue), operator);
          setDisplayValue(result.toString());
          setOperator(null);
          setFirstValue(null);
          setWaitingForSecondValue(false);
        }
        break;
      default:
        if (waitingForSecondValue) {
          setDisplayValue(value);
          setWaitingForSecondValue(false);
        } else {
          setDisplayValue(displayValue === '0' ? value : displayValue + value);
        }
        break;
    }
  };

  const evaluate = (firstValue: number, secondValue: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return 0;
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        {['7', '8', '9', '/'].map((btn) => (
          <Button key={btn} value={btn} onClick={handleButtonClick} />
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <Button key={btn} value={btn} onClick={handleButtonClick} />
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <Button key={btn} value={btn} onClick={handleButtonClick} />
        ))}
        {['0', '.', '=', '+'].map((btn) => (
          <Button key={btn} value={btn} onClick={handleButtonClick} />
        ))}
        <Button value="C" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Calculator;