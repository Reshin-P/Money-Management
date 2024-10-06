export const parseBody = (event) => {
  try {
    return JSON.parse(event.body);
  } catch (error) {
    throw new Error("Invalid JSON body");
  }
};
