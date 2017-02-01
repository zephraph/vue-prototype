import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

export const render = async (component) => {
  const renderer = createRenderer();
  return new Promise((resolve, reject) => {
    renderer.renderToString(new Vue(component), (err, str) => {
      if (err) reject(err);
      resolve(str);
    });
  });
}
