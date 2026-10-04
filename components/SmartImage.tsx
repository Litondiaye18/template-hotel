import Image from "next/image";

type Shared = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

type SmartImageProps = Shared &
  (
    | { fill: true; width?: never; height?: never }
    | { fill?: false; width: number; height: number }
  );

export function SmartImage(props: SmartImageProps) {
  const unoptimized = props.src.endsWith(".svg");

  if (props.fill) {
    return (
      <Image
        src={props.src}
        alt={props.alt}
        className={props.className}
        priority={props.priority}
        sizes={props.sizes}
        fill
        unoptimized={unoptimized}
      />
    );
  }

  return (
    <Image
      src={props.src}
      alt={props.alt}
      className={props.className}
      priority={props.priority}
      sizes={props.sizes}
      width={props.width}
      height={props.height}
      unoptimized={unoptimized}
    />
  );
}
