import { batchWriteItems } from "src/services/dynamoDB";

export const main = async (event) => {
  try {
    const records = event.Records;
    const tableName = `${process.env.STAGE}_bo_trial_table`;

    const putRequests = records.map((record) => {
      const { key: fileKey } = record.s3.object;

      const [userId, fileType, fileName] = fileKey.split("/").filter(Boolean);
      const itemId = `file_${fileType}_${fileName}`;
      const dateCreated = new Date().toISOString();

      return {
        PutRequest: {
          Item: {
            id: userId,
            recType: itemId,
            dateCreated,
            fileType,
          },
        },
      };
    });

    await batchWriteItems(tableName, putRequests);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Metadata records created successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating metadata records",
        error,
      }),
    };
  }
};
