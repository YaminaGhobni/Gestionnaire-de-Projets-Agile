import { JWT } from 'google-auth-library';
import * as key from './firebase-adminsdk.json';
import axios from 'axios';
import NotificationRepo from '../../database/repository/NotificationRepo';

const getAccessToken = () => {
  return new Promise(function (resolve, reject) {
    const jwtClient = new JWT(
      key.client_email,
      undefined,
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging'],
      undefined
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens!.access_token);
    });
  });
};

const sendNotif = async (
  token: string,
  title: string,
  body: string,
  data: object,
  topic: string
) => {
  try {
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const payload = {
      message: {
        topic,
        notification: {
          title,
          body,
        },
        data,
      },
    };

    return await axios({
      method: 'post',
      url: `https://fcm.googleapis.com/v1/projects/${key.project_id}/messages:send`,
      data: payload,
      headers,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sendNotifUser = async (userId: string, content: any) => {
  const token = (await getAccessToken()) as string;
  await sendNotif(token, content.title, content.body, content.data, userId);
  await NotificationRepo.create({
    userId,
    title: content.title,
    body: content.body,
    data: content.data,
  });
};

export const sendNotifUserMessage = async (userId: string, content: any) => {
  const token = (await getAccessToken()) as string;
  await sendNotif(token, content.title, content.body, content.data, userId);
};
