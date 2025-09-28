import { useEffect, useRef, useState } from "react";

interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize<TRef extends HTMLElement>(
  initialSize: ElementSize = { width: 0, height: 0 }
) {
  const ref = useRef<TRef>(null);
  const [size, setSize] = useState<ElementSize>(initialSize);

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }, [ref]);

  return [ref, size] as const;
}
