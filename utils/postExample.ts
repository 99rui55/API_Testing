import { post } from "./types";

export const examplePost: post = {
  title: "example title",
  content: "example content",
};

export const emptyExamplePost: post = {
  title: "",
  content: "",
};

export const withID = (ID: string): post => {
  return { _id: ID, title: "example title", content: "example content" };
};
