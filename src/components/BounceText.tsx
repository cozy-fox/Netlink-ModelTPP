import { Component, For, mergeProps, onMount } from 'solid-js';
import { spring } from 'motion';
import { Motion } from '@motionone/solid';

type BounceTextProps = {
  class: string;
  text: string;
  initialDelay?: number;
  stagger?: number;
};

const defaultProps = {
  initialDelay: 0,
  stagger: 0.015,
};

const BounceText: Component<BounceTextProps> = (propsIn) => {
  const props = mergeProps(defaultProps, propsIn);

  // no idea why stagger function doesn't work so this
  // "hack" is needed
  let i = 0;
  onMount(() => (i = 0));

  return (
    <p class={props.class}>
      <For each={props.text.split(' ')}>
        {(word) => (
          <>
            <span class="inline-block">
              <For each={word.split('')}>
                {(char) => (
                  <Motion.span
                    class="inline-block"
                    initial={{ x: -10, y: 50, scale: 0.75, rotate: 15, filter: 'opacity(0)' }}
                    animate={{ x: 0, y: 0, scale: 1.0, rotate: 0, filter: 'opacity(1)' }}
                    transition={{
                      allowWebkitAcceleration: true,
                      easing: spring({ damping: 15, stiffness: 160 }),
                      delay: props.initialDelay + i++ * props.stagger,
                    }}
                  >
                    {char}
                  </Motion.span>
                )}
              </For>
            </span>
            <span> </span>
          </>
        )}
      </For>
    </p>
  );
};

export default BounceText;
