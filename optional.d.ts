declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native';

  const content: ImageSourcePropType;

  export default content;
}

declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';

  const content: ImageSourcePropType;

  export default content;
}
