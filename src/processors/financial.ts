export const main = async (event) => {
  console.log("process financial", event);
  console.log("Record", event.Records[0].dynamodb);
  console.log("New Image", event.Records[0].dynamodb.NewImage);
};
