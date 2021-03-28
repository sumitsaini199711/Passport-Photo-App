import json
import boto3
import base64
import sys
import os

def write_to_file(save_path,data):
    with open(save_path, "wb") as f:
        f.write(base64.b64decode(data))

def lambda_handler(event, context):
    client = boto3.client('rekognition')
    encodeImage = event['photo']
    write_to_file('/tmp/passport.jpg' ,encodeImage)

    try:
        imgFile = open('/tmp/passport.jpg','rb')
        imgBytes = imgFile.read()
        imgFile.close()
    except Exception as e:
        print(e)
    
    imgObj = {'Bytes': imgBytes}
    response_labels = client.detect_faces(Image=imgObj)
    
        
    return {
        'statusCode': 200,
        'body': json.dumps(response_labels)
    }
