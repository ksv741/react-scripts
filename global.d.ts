declare module '*.jpg' {
  export default '' as string;
}
declare module '*.png' {
  export default '' as string;
}
declare module '*.jpeg' {
  export default '' as string;
}
declare module '*.gif' {
  export default '' as string;
}
declare module '*.webp' {
  export default '' as string;
}
declare module '*.avif' {
  export default '' as string;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export = content;
}

declare module '*.svg' {
  import type React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
