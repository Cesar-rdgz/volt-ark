declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    const src: string;
    export default src;
}

declare module './home.component' {
    const Home: React.FC;
    export { Home };
}

declare module './navigation.component' {
    const Navigation: React.FC;
    export { Navigation };
  }