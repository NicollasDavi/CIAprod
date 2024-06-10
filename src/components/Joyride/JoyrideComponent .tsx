import React from 'react';
import Tour, { STATUS as JoyrideStatus } from 'react-joyride';

interface Step {
  target: string;
  content: string;
}

interface Props {
  steps: Step[];
  run: boolean;
  onStart?: () => void;
  setFinish?: (state : boolean) => void;
}

const JoyrideComponent: React.FC<Props> = ({ steps, run, onStart, setFinish }) => {
  const [isRunning, setIsRunning] = React.useState(false);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;

    if ([JoyrideStatus.FINISHED, JoyrideStatus.SKIPPED].includes(status)) {
      console.log("acabo")
      setIsRunning(false);
      if(setFinish)
      setFinish(false)
    }
  };

  React.useEffect(() => {
    if (run) {
      setIsRunning(true);
      onStart && onStart(); // Chama a função de início manual, se fornecida
    }
  }, [run, onStart]);

  return (
    <Tour
      continuous
      run={isRunning}
      steps={steps}
      callback={handleJoyrideCallback}
      disableScrolling
      showSkipButton
      showProgress
      spotlightClicks
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            primaryColor: '#3B82F6',
            textColor: '#000',
            width: 300,
            zIndex: 1000,
          },
        }}
    />
  );
};

export default JoyrideComponent;
