import { Motion } from '@motionone/solid';
import { spring } from 'motion';
import { Component, ParentProps } from 'solid-js';

const PageWrapper: Component<ParentProps> = (props: ParentProps) => {
  return (
    <Motion.div
      initial={{ filter: 'opacity(0)', transform: 'translateY(100%)' }}
      animate={{ filter: 'opacity(1)', transform: 'translateY(0)' }}
      exit={{ filter: 'opacity(0)', transform: 'translateY(-100%)' }}
      transition={{
        allowWebkitAcceleration: true,
        easing: spring({ damping: 25, stiffness: 160 }),
      }}
      class="col-span-full row-span-full mx-auto w-full h-full"
    >
      <div class="inline-block w-full mx-0 h-full">{props.children}</div>
    </Motion.div>
  );
};

export default PageWrapper;
