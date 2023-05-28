export const getBody = function (event: any) {
  return JSON.parse(event.body);
};
