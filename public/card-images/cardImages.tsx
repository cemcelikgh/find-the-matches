import { ImageFn } from "@/types";
import Image from "next/image";

const CardImage: ImageFn = name => {
  return <Image
    alt={name}
    src={`/card-images/images/${name}.svg`}
    fill
    sizes='100%'
    style={{
      objectFit: 'contain'
    }}
  />;
};

export default CardImage;
