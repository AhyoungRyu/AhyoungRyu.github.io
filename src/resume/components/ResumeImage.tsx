import type { ComponentProps } from "react";

/* eslint-disable @next/next/no-img-element -- Static export uses local intrinsic-size images without a remote optimizer. */

type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

type ResumeImageProps = Omit<
  ComponentProps<"img">,
  "src" | "alt" | "width" | "height"
> & {
  image: ImageData;
};

export function ResumeImage({
  image,
  loading = "lazy",
  style,
  ...props
}: ResumeImageProps) {
  return (
    <img
      {...props}
      alt={image.alt}
      height={image.height}
      loading={loading}
      src={image.src}
      style={{ ...style, objectFit: image.fit }}
      width={image.width}
    />
  );
}
