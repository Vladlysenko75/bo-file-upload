import { getBody } from "src/utils/Request";

const AWS = require("aws-sdk");
const s3 = new AWS.S3({ signatureVersion: "v4" });

export const upload = async (event) => {
  const { user_id, file_type, file_name } = getBody(event);

  const s3Params = {
    Bucket: `${process.env.BUCKET}-${process.env.STAGE}`,
    Key: `${user_id}/${file_type}/${file_name}`,
    ContentType: "application/octet-stream",
    ACL: "private",
    Expires: 300,
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadURL,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generating pre-signed URL",
        error,
      }),
    };
  }
};
