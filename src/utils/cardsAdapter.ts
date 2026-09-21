import { Card } from "@/types/types";
import { createEntityAdapter } from "@reduxjs/toolkit";

const cardsAdapter = createEntityAdapter<Card>();

export default cardsAdapter;
