export interface StarClass {
  id: number;
  name: string;
  temperature: number;
  color: string;
  spectre: string;
  examples: string;
  image_url?: string;
}

export interface RequestBin {
  request_id: number;
  item_count: number;
}
