const AWS = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
const AWS_WEDDING_GUEST_ROLE = process.env.AWS_WEDDING_GUEST_ROLE;

function getSignedRequests(req, res) {
  var sts = new AWS.STS();
  const stsParams = {
    RoleArn: AWS_WEDDING_GUEST_ROLE,
    RoleSessionName: 'wedding-rsvp-guest',
    DurationSeconds: 900
  };
  sts.assumeRole(stsParams, function(err, data) {
    if(err) {
      console.log('could not get temporary credentials', err);
      return res.end();
    }
    console.log('acquired temporary credentials', data.Credentials);

    const S3 = new AWS.S3({
      region: 'eu-west-2',
      credentials: {
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
      }
    });

    const fileName = req.query['file-name'].replace(/\s+/g, '');
    const fileType = req.query['file-type'];

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    S3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.status(200).json(returnData);
    });
  });
}

module.exports = {
  getSignedRequests: getSignedRequests
};
