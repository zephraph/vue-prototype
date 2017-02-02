import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

export const render = async renderFunc => {
  const renderer = createRenderer();
  return new Promise((resolve, reject) => {
    renderer.renderToString(new Vue({ render: renderFunc }), (err, str) => {
      if (err) reject(err);
      resolve(str);
    });
  });
}
