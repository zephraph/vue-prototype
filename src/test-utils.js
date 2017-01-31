import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

export const async render = (component) => {
  const renderer = createRenderer();
  return new Promise((resolve, reject) => {
    renderer.renderToString(component, (err, str) => {
      if (err) reject(err);
      resolve(str);
    });
  });
}
