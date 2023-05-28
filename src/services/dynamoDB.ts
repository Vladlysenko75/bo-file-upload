import { DynamoDB } from "aws-sdk";

const dynamoDB = new DynamoDB.DocumentClient();

export const batchWriteItems = async <T>(
  tableName: string,
  putRequests: T[]
): Promise<void> => {
  const params = {
    RequestItems: {
      [tableName]: putRequests,
    },
  };

  await dynamoDB.batchWrite(params).promise();
};
