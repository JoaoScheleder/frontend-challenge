import { Fit, Alignment, Layout, useRive } from '@rive-app/react-canvas';

export const Robocat = ({className} : {className : string}) => {
  const {rive, RiveComponent} = useRive({
    src: '/robocat.riv',
    animations: ['Loop', 'Face Idle'],
    stateMachines: 'State Machine',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <RiveComponent className={className}/>
  );
};