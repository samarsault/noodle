#!/bin/sh
echo Populating Environment Variables
echo --------------------------------
# Creating Client .env
CLIENT_ENV_LOC="./client/.env"
rm -f ${CLIENT_ENV_LOC}
touch ${CLIENT_ENV_LOC}
echo VUE_APP_SERVER_URL=http://localhost:3000 >> $CLIENT_ENV_LOC

# Creating Server .env
SERVER_ENV_LOC="./server/.env"
rm -f $SERVER_ENV_LOC
touch $SERVER_ENV_LOC
echo "Please enter the Google OAuth Client ID (eg: 3232-u23.apps.googleusercontent.com)"
read GOOGLE_CLIENT_ID
echo GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID >> $SERVER_ENV_LOC
echo "Please enter Google OAuth Client Secret(eg: sdjfoasjfoda)"
read GOOGLE_CLIENT_SECRET
echo GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET >> $SERVER_ENV_LOC
echo -n "Do you have AWS configured?(y/N) "
read answer
if [ "$answer" != "${answer#[Yy]}" ] ;then
    echo Please Enter AWS Access ID
    read aws_access_key_id
    echo aws_access_key_id=$aws_access_key_id >> $SERVER_ENV_LOC

    echo Please Enter AWS Secret Access Key
    read aws_secret_access_key
    echo aws_secret_access_key=$aws_secret_access_key >> $SERVER_ENV_LOC
    
    echo Please Enter AWS Access Region
    read aws_region
    echo aws_region=$aws_region >> $SERVER_ENV_LOC

    echo Please Enter AWS S3 Bucket Name
    read aws_bucket_name
    echo aws_bucket_name=$aws_bucket_name >> $SERVER_ENV_LOC

else
    echo AWS not setup
fi
echo SECRET_KEY=randomtext >> $SERVER_ENV_LOC
echo CLIENT_URL=http://localhost:8080 >> $SERVER_ENV_LOC

echo "Environment Variables have been set"

echo Client Environment
echo ------------------
cat $CLIENT_ENV_LOC
echo "##################"
echo Server Environment
echo ------------------
cat $SERVER_ENV_LOC
