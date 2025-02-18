import { ImagElem } from "@/types/ImagElemType.d";
import Image from "next/image";

const CardImage: ImagElem = ({ name }) => {
  return <Image
    alt={name}
    src={`/images/card-images/${name}.svg`}
    fill
    sizes='100%'
    style={{
      objectFit: 'contain'
    }}
  />
};

export default CardImage;
