import fruits from "@/data/fruits";

export type Theme = 'light' | 'dark';

type Fruit = typeof fruits[number];

export type Fruits = Fruit[];

type Border =  'gray-border' | 'yellow-border' | 'red-border' | 'green-border';

export interface Card {
  fruitName: Fruit;
  id: string;
  border: Border;
  isOpen: boolean;
}
